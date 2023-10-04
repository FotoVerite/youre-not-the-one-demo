import { APP_EVENTS_ACTIONS } from "@Components/appEvents/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { nothing, produce } from "immer";

import {
  routeStartedPayload,
  routeUpdatePayload,
  routeFinishedPayload,
  createCleanupPayload,
} from "./eventPayloads";
import {
  setMessageEphemeralProps,
  revertPreviousMessageEphemeralProps,
  resetMessageDelays,
} from "./messageMutations";
import {
  ConversationReducerActionsType,
  CONVERSATION_REDUCER_ACTIONS,
  RefreshAvailablePayloadType,
} from "./type";
import { MESSAGE_CONTENT } from "../../contentWithMetaTypes";
import {
  isStarted,
  isActiveNotificationRoute,
  isActiveChoosableRoute,
} from "../../routes/guards";
import { ROUTE_STATE_TYPE, ROUTE_TYPE } from "../../routes/types";
import { convertMessageToString } from "../../useConversations/determineLogLine";
import { createSkBubbleFromPayload } from "../digestion/SkFunctions/createSkBubble";
import { appendReadLabel } from "../digestion/readLabel";
import {
  BaseConfigType,
  DigestedConversationType,
  MessagePayloadType,
  isSentMessage,
  isSentMessagePayload,
  hasStartedRoute,
  DigestedConversationListItem,
  DigestedMessageProps,
  DigestedConversationWithStartedRoute,
} from "../digestion/types";
import { getListHeight } from "../digestion/utility";
import { createTimeStampLabel } from "../digestion/SkFunctions/createTimeStampLabel";

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
  payload: RefreshAvailablePayloadType
) => {
  const { blockable, activeRoute } = payload;
  draft.blockable = blockable;
  if (!isStarted(draft.activeRoute)) {
    draft.activeRoute = activeRoute;
  }
  return _createMessageAndUpdateDraft(config, draft);
};

const _createMessageAndUpdateDraft = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  chosenOption?: string
) => {
  let route: MessagePayloadType[] = [];
  const activeRoute = draft.activeRoute;
  if (!activeRoute) return draft;
  if (isStarted(activeRoute)) return draft;
  if (isActiveChoosableRoute(activeRoute) && chosenOption) {
    route = activeRoute.routes[chosenOption];
  } 
  if (isActiveNotificationRoute(activeRoute)) {
    activeRoute.exchanges = [...activeRoute.exchanges]
    route = activeRoute.exchanges;
  }

  const payload = route.shift();
  if (payload == null) {
    return draft;
  }

  draft.activeRoute = {
    ...activeRoute,
    ...{
      indexAt: payload.index,
      createdAt: new Date().toISOString(),
      chosen: chosenOption,
      exchanges: [payload],
      finished: ROUTE_STATE_TYPE.STARTED,
      pending: route,
      type: ROUTE_TYPE.CHOOSE,
      updatedAt: new Date().toISOString(),
    },
  };

  resetMessageDelays(draft);
  let offset = getListHeight(draft.exchanges);
  const timestamp = createTimeStampLabel(
    new Date().toISOString(),
    config.width,
    offset
  );
  draft.exchanges.push(timestamp)
  offset += timestamp.height
  const message = createSkBubbleFromPayload(
    { ...config, ...{ group: draft.group || false, offset } },
    payload
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

  draft.eventAction = routeStartedPayload(
    draft,
    draft.activeRoute,
    convertMessageToString(payload.messageContent)
  );
  delete draft.availableRoutes[draft.activeRoute.id]
  _createCleanupAction(draft);
  return draft;
};

const startRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  payload: { chosenOption: string }
) => {
  return _createMessageAndUpdateDraft(config, draft, payload.chosenOption);
};

const block = (draft: DigestedConversationType) => {
  draft.eventAction = {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION,
    payload: { name: draft.name },
  };
  return draft;
};

const _setInputDisplay = (
  draft: DigestedConversationWithStartedRoute,
  nextMessage: MessagePayloadType
) => {
  draft.activeRoute.nextMessageInQueue = convertMessageToString(
    nextMessage.messageContent
  );
  _createCleanupAction(draft);
  return draft;
};

const _appendNextMessage = (
  config: BaseConfigType,
  draft: DigestedConversationWithStartedRoute,
  nextMessage: MessagePayloadType
) => {
  const offset = getListHeight(draft.exchanges);
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
  draft.activeRoute.pending.shift();
  draft.activeRoute.indexAt = nextMessage.index;
  draft.activeRoute.nextMessageInQueue = undefined;
  draft.eventAction = routeUpdatePayload(
    draft,
    nextMessage.index,
    convertMessageToString(nextMessage.messageContent)
  );
  _createCleanupAction(draft);
  return draft;
};

const continueRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType
) => {
  if (!hasStartedRoute(draft)) return;
  const activeRoute = draft.activeRoute;
  draft.receivingMessage = false;
  const nextMessage = draft.activeRoute.pending[0];
  if (nextMessage == null) return finishRoute(draft);

  if (
    isSentMessagePayload(nextMessage) &&
    activeRoute.nextMessageInQueue == null
  ) {
    return _setInputDisplay(draft, nextMessage);
  }
  _appendNextMessage(config, draft, nextMessage);

  return draft;
};

const finishRoute = (
  draft: DigestedConversationWithStartedRoute,
  logline?: string
) => {
  draft.eventAction = routeFinishedPayload(draft, logline);
  const newDraft = draft as DigestedConversationType;
  newDraft.activeRoute = undefined;
  return newDraft;
};

const _skipRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType
) => {
  if (!hasStartedRoute(draft)) {
    return;
  }
  if (draft.receivingMessage) return;
  let offset = getListHeight(draft.exchanges);
  const path = draft.activeRoute.pending.reduce((ret, payload) => {
    const message = createSkBubbleFromPayload(
      { ...config, offset, ...{ group: draft.group || false } },
      payload
    );
    offset += message.height + message.paddingBottom;
    ret.push(message);
    return ret;
  }, [] as DigestedConversationListItem[]);
  draft.exchanges = draft.exchanges.concat(path);
  finishRoute(
    draft,
    convertMessageToString(
      draft.activeRoute.pending.slice(-1)[0].messageContent
    )
  );
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
  if (
    !hasStartedRoute(draft) ||
    draft.activeRoute.nextMessageInQueue ||
    draft.activeRoute.pending.length === 0
  ) {
    draft.cleanupAction = undefined;
    return;
  }
  const end = draft.activeRoute.pending.slice(-1)[0];
  const nextSent = draft.activeRoute.pending.find((e) =>
    isSentMessagePayload(e)
  );
  const forwardTo = nextSent || end;
  draft.cleanupAction = createCleanupPayload(
    draft,
    forwardTo.index,
    nextSent != null,
    convertMessageToString(forwardTo.messageContent)
  );
};

export default createConversationReducer;
