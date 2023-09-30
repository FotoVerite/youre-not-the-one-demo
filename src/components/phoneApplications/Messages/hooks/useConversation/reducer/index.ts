import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
} from "@Components/appEvents/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { nothing, produce } from "immer";

import {
  createCleanupPayload,
  routeFinishedPayload,
  routeStartedPayload,
  routeUpdatePayload,
} from "./eventPayloads";
import {
  resetMessageDelays,
  revertPreviousMessageEphemeralProps,
  setMessageEphemeralProps,
} from "./messageMutations";
import { findUnseenNotification } from "./refresh";
import { getPathViaPayload } from "./routes";
import {
  ConversationReducerActionsType,
  CONVERSATION_REDUCER_ACTIONS,
} from "./type";
import { EFFECT_TYPE, MESSAGE_CONTENT } from "../../contentWithMetaTypes";
import { findAvailableRoutes } from "../../routes/available";
import { getSeenRoutes } from "../../routes/seen";
import { convertMessageToString } from "../../useConversations/determineLogLine";
import { ExchangeBlockType } from "../../useConversations/types";
import { createSkBubbleFromPayload } from "../digestion/SkFunctions/createSkBubble";
import { createTimeStampLabel } from "../digestion/SkFunctions/createTimeStampLabel";
import { blockableConditionsMet } from "../digestion/blockable";
import { convertBlockToMessagePayloadType } from "../digestion/digestRoute";
import { appendReadLabel } from "../digestion/readLabel";
import {
  DigestedConversationType,
  DigestedConversationListItem,
  BaseConfigType,
  DigestedMessageProps,
  isSentMessage,
  hasAvailableRoute,
  isSentMessagePayload,
  hasStartedRoute,
  DigestedConversationWithAvailableRoute,
} from "../digestion/types";
import { getListHeight } from "../digestion/utility";

const createConversationReducer =
  (config: BaseConfigType) =>
  (
    state: DigestedConversationType | undefined,
    action: ConversationReducerActionsType
  ) =>
    conversationReducer(state, action, config);

const conversationReducer = produce(
  (
    draft: DigestedConversationType | undefined,
    action: ConversationReducerActionsType,
    config: BaseConfigType
  ): DigestedConversationType | undefined | typeof nothing => {
    if (action.type === CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION) {
      return addConversation(action.payload);
    }
    if (draft === undefined) {
      return draft;
    }
    switch (action.type) {
      case CONVERSATION_REDUCER_ACTIONS.BLOCK:
        return block(draft);
      case CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE:
        return continueRoute(config, draft);
      case CONVERSATION_REDUCER_ACTIONS.REFRESH:
        return refreshConversation(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.START_ROUTE:
        return startRoute(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE:
        return updateMessage(
          config,
          draft,
          action.payload.props,
          action.payload.ID
        );
      case CONVERSATION_REDUCER_ACTIONS.SKIP_ROUTE:
        return _skipRoute(config, draft);
      case CONVERSATION_REDUCER_ACTIONS.RESET:
        return nothing;
      default:
        return draft;
    }
  }
);

const refreshConversation = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  events: AppEventsType
) => {
  draft.blockable = blockableConditionsMet(draft, events);
  let route = findAvailableRoutes(
    draft.name,
    draft.routes || [],
    events
  ).shift();

  const seenRoutes = getSeenRoutes(
    draft.name,
    events,
    draft.routes,
    draft.notificationRoutes
  );
  const notificationRoute = findUnseenNotification(draft, seenRoutes);
  if (notificationRoute && draft.availableRoute?.id === notificationRoute.id) {
    return;
  }
  if (route && route.id !== draft.availableRoute?.id) {
    draft.availableRoute = route;
  }
  if (notificationRoute == null) return draft;
  draft.availableRoute = notificationRoute;
  return _createMessageAndUpdateDraft(
    config,
    draft,
    notificationRoute.exchanges,
    draft.availableRoute.id
  );
};

const _createMessageAndUpdateDraft = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  path: ExchangeBlockType[],
  routeID: number,
  chosenOption?: string
) => {
  const pendingMessages = convertBlockToMessagePayloadType(path);
  const nextMessageContent = pendingMessages.shift();
  if (nextMessageContent == null) {
    return draft;
  }
  resetMessageDelays(draft);
  let offset = getListHeight(draft.exchanges);
  addNewTimeBlockToExchanges(config, draft, offset);
  offset += 30;
  const message = createSkBubbleFromPayload(
    { ...config, ...{ group: draft.group || false, offset } },
    nextMessageContent
  );
  setMessageEphemeralProps(draft, message);
  draft.exchanges.push(message);
  if (isSentMessage(message)) {
    draft.exchanges = appendReadLabel(
      draft.exchanges,
      config.width,
      undefined,
      draft.leaveAsDelivered
    );
  }
  draft.activePath = pendingMessages;
  draft.chosenRoute = chosenOption;
  draft.routeAtIndex = 1;
  draft.eventAction = routeStartedPayload(draft, routeID);
  _createCleanupAction(draft);
};

const startRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  payload: { chosenOption: string }
) => {
  if (!hasAvailableRoute(draft)) return;
  const path = getPathViaPayload(draft, payload);
  if (!path) return;
  return _createMessageAndUpdateDraft(
    config,
    draft,
    path,
    draft.availableRoute.id,
    payload.chosenOption
  );
};

const addNewTimeBlockToExchanges = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  offset: number
) => {
  const timeItem = createTimeStampLabel(
    new Date().toISOString(),
    config.width,
    offset
  );
  timeItem.contentDelay = 10;
  draft.exchanges.push(timeItem);
};

const block = (draft: DigestedConversationType) => {
  draft.eventAction = {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION,
    payload: { name: draft.name },
  };
  return draft;
};

const continueRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType
) => {
  if (!hasAvailableRoute(draft)) return;
  const nextMessage = draft.activePath[0];
  const offset = getListHeight(draft.exchanges);
  if (nextMessage == null) return finishRoute(draft, draft.availableRoute.id);

  if (isSentMessagePayload(nextMessage) && draft.nextMessageInQueue == null) {
    draft.nextMessageInQueue = convertMessageToString(
      nextMessage.messageContent
    );
  } else {
    const message = createSkBubbleFromPayload(
      { ...config, ...{ group: draft.group || false, offset } },
      nextMessage
    );
    revertPreviousMessageEphemeralProps(draft);
    setMessageEphemeralProps(draft, message);

    draft.exchanges.push(message);

    if (
      message.name === MESSAGE_CONTACT_NAME.SELF &&
      message.type !== MESSAGE_CONTENT.SNAPSHOT
    ) {
      draft.exchanges = appendReadLabel(
        draft.exchanges,
        config.width,
        undefined,
        draft.leaveAsDelivered
      );
    }
    draft.activePath.shift();
    draft.routeAtIndex = (draft.routeAtIndex || 0) + 1;
    draft.nextMessageInQueue = undefined;
    draft.eventAction = routeUpdatePayload(draft);
  }
  _createCleanupAction(draft);
  return draft;
};

const finishRoute = (draft: DigestedConversationType, routeID: number) => {
  draft.eventAction = routeFinishedPayload(
    draft as DigestedConversationWithAvailableRoute,
    routeID
  );
  draft.seenRoutes.push(routeID.toString());
  draft.nextMessageInQueue = undefined;
  draft.availableRoute = undefined;
  draft.routeAtIndex = undefined;
  draft.chosenRoute = undefined;
  return draft;
};

const _skipRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType
) => {
  if (!hasStartedRoute(draft)) {
    return;
  }
  const offset = getListHeight(draft.exchanges);
  const path = draft.activePath.reduce((ret, payload) => {
    ret.push(
      createSkBubbleFromPayload(
        { ...config, offset, ...{ group: draft.group || false } },
        payload
      )
    );
    return ret;
  }, [] as DigestedConversationListItem[]);
  draft.exchanges = draft.exchanges.concat(path);
  finishRoute(draft, draft.availableRoute.id);
  return draft;
};

const addConversation = (conversation: DigestedConversationType) => {
  resetMessageDelays(conversation);
  conversation.eventAction = {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN,
    payload: { name: conversation.name },
  };
  return conversation;
};

const updateMessage = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  props: DigestedMessageProps,
  ID: string
) => {
  const index = draft.exchanges.findIndex((draft) => draft.ID === ID);
  if (index !== undefined) {
    draft.exchanges[index] = {
      ...draft.exchanges[index],
      ...props,
    } as DigestedConversationListItem;
  }
  //draft.exchanges = appendReadLabel(draft.exchanges, config.width);
  return draft;
};

const _createCleanupAction = (draft: DigestedConversationType) => {
  const toEnd = draft.activePath.length;
  if (!hasAvailableRoute(draft) || draft.nextMessageInQueue || toEnd === 0) {
    draft.cleanupAction = undefined;
    return;
  }
  let forewordToIndex = draft.activePath.findIndex((e) =>
    isSentMessagePayload(e)
  );

  if (forewordToIndex === 0) {
    draft.cleanupAction = undefined;
    return;
  }
  const finished = forewordToIndex === -1;
  forewordToIndex = forewordToIndex === -1 ? toEnd : forewordToIndex;
  draft.cleanupAction = createCleanupPayload(draft, forewordToIndex, finished);
};

export default createConversationReducer;
