import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
} from "@Components/appEvents/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { nothing, produce } from "immer";

import {
  ConversationReducerActionsType,
  CONVERSATION_REDUCER_ACTIONS,
} from "./type";
import { MESSAGE_CONTENT } from "../../contentWithMetaTypes";
import { findAvailableRoutes } from "../../routes/available";
import { convertMessageToString } from "../../useConversations/determineLogLine";
import { createSkBubbleFromPayload } from "../digestion/SkFunctions/createSkBubble";
import { createTimeStampLabel } from "../digestion/SkFunctions/createTimeStampLabel";
import { convertBlockToMessagePayloadType } from "../digestion/digestRoute";
import { appendReadLabel } from "../digestion/readLabel";
import {
  DigestedConversationType,
  DigestedConversationListItem,
  BaseConfigType,
  DigestedMessageProps,
  isDigestedBubble,
} from "../digestion/types";
import { getListHeight } from "../digestion/utility";

const createConversationReducer =
  (config: BaseConfigType) =>
  (
    state: DigestedConversationType | undefined,
    action: ConversationReducerActionsType,
  ) =>
    conversationReducer(state, action, config);

const conversationReducer = produce(
  (
    draft: DigestedConversationType | undefined,
    action: ConversationReducerActionsType,
    config: BaseConfigType,
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
      case CONVERSATION_REDUCER_ACTIONS.REFRESH_AVAILABLE_ROUTE:
        return refreshAvailableRoute(draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.START_ROUTE:
        return startRoute(config, draft, action.payload);
      case CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE:
        return updateMessage(draft, action.payload.props, action.payload.ID);
      case CONVERSATION_REDUCER_ACTIONS.SKIP_ROUTE:
        return _skipRoute(config, draft);
      case CONVERSATION_REDUCER_ACTIONS.RESET:
        return nothing;
      default:
        return draft;
    }
  },
);

const refreshAvailableRoute = (
  draft: DigestedConversationType,
  events: AppEventsType,
) => {
  const route = findAvailableRoutes(
    draft.name,
    draft.routes || [],
    events,
  ).shift();
  if (route && route.id !== draft.availableRoute?.id) {
    draft.availableRoute = route;
  }
  return draft;
};

const startRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  payload: { chosenOption: string },
) => {
  const route = draft.routes.find((r) => r.id === draft.availableRoute?.id);
  if (route == null) {
    return draft;
  }
  const path = route.routes[payload.chosenOption];
  const pendingMessages = convertBlockToMessagePayloadType(path);
  const nextMessageContent = pendingMessages.shift();
  if (nextMessageContent == null) {
    return draft;
  }
  const offset = getListHeight(draft.exchanges);
  addNewTimeBlockToExchanges(config, draft, offset);
  const message = createSkBubbleFromPayload(
    { ...config, ...{ group: draft.group || false, offset } },
    nextMessageContent,
  );
  message.contentDelay = 400;
  draft.exchanges.push(message);
  if (message.name === MESSAGE_CONTACT_NAME.SELF) {
    draft.exchanges = appendReadLabel(draft.exchanges, config.width);
  }
  draft.activePath = pendingMessages;
  draft.chosenRoute = payload.chosenOption;
  draft.routeAtIndex = 1;
  draft.eventAction = {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
    payload: {
      name: draft.name,
      chosen: draft.chosenRoute,
      routeId: route.id,
      atIndex: 1,
    },
  };
  return draft;
};

const addNewTimeBlockToExchanges = (
  config: BaseConfigType,
  draft: DigestedConversationType,
  offset: number,
) => {
  const timeItem = createTimeStampLabel(
    new Date().toISOString(),
    config.width,
    offset,
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
  draft: DigestedConversationType,
) => {
  if (draft?.activePath == null) {
    return draft;
  }
  if (draft.availableRoute == null) {
    return draft;
  }
  const nextMessage = draft.activePath[0];
  const offset = getListHeight(draft.exchanges);
  if (nextMessage == null) {
    draft.eventAction = {
      type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
      payload: {
        routeId: draft.availableRoute.id,
        name: draft.name,
        finished: true,
      },
    };
    draft.nextMessageInQueue = undefined;
    draft.availableRoute = undefined;
    draft.routeAtIndex = undefined;
    draft.chosenRoute = undefined;

    return draft;
  }

  if (
    nextMessage?.name === MESSAGE_CONTACT_NAME.SELF &&
    draft.nextMessageInQueue == null
  ) {
    draft.nextMessageInQueue = convertMessageToString(
      nextMessage.messageContent,
    );
  } else {
    const message = createSkBubbleFromPayload(
      { ...config, ...{ group: draft.group || false, offset } },
      nextMessage,
    );
    message.contentDelay = message.contentDelay || 400;
    message.isLastInExchange = true;
    const previousMessage = draft.exchanges.slice(-1)[0];
    previousMessage.contentDelay = undefined;
    previousMessage.typingDelay = undefined;
    if (
      isDigestedBubble(previousMessage) &&
      previousMessage.name === message.name
    ) {
      previousMessage.isLastInExchange = false;
    }
    draft.exchanges.push(message);
    if (message.name === MESSAGE_CONTACT_NAME.SELF) {
      draft.exchanges = appendReadLabel(draft.exchanges, config.width);
    }
    draft.activePath.shift();
    draft.routeAtIndex = (draft.routeAtIndex || 0) + 1;
    draft.nextMessageInQueue = undefined;
    draft.eventAction = {
      type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
      payload: {
        routeId: draft.availableRoute.id,
        name: draft.name,
        atIndex: draft.routeAtIndex,
      },
    };
  }
  return draft;
};

const _skipRoute = (
  config: BaseConfigType,
  draft: DigestedConversationType,
) => {
  if (draft?.activePath == null || draft?.activePath.length === 0) {
    return draft;
  }
  if (draft.availableRoute == null) {
    return draft;
  }
  const offset = getListHeight(draft.exchanges);
  const path = draft.activePath.reduce((ret, payload) => {
    ret.push(
      createSkBubbleFromPayload(
        { ...config, offset, ...{ group: draft.group || false } },
        payload,
      ),
    );
    return ret;
  }, [] as DigestedConversationListItem[]);
  draft.exchanges = draft.exchanges.concat(path);

  draft.eventAction = {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
    payload: {
      routeId: draft.availableRoute.id,
      name: draft.name,
      finished: true,
    },
  };
  draft.activePath = [];
  draft.nextMessageInQueue = undefined;
  draft.availableRoute = undefined;
  draft.routeAtIndex = undefined;
  draft.chosenRoute = undefined;

  return draft;
};

const removePreviousTail = (draftMessage: DigestedConversationListItem) => {
  if (draftMessage.type === MESSAGE_CONTENT.TIME) {
    return;
  }
  if (draftMessage.name !== MESSAGE_CONTACT_NAME.SELF) {
  }
};

const addConversation = (conversation: DigestedConversationType) => {
  conversation.exchanges.forEach((message) => {
    message.typingDelay = undefined;
    message.contentDelay = undefined;
  });
  conversation.eventAction = {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN,
    payload: { name: conversation.name },
  };
  return conversation;
};

const updateMessage = (
  draft: DigestedConversationType,
  props: DigestedMessageProps,
  ID: string,
) => {
  const index = draft.exchanges.findIndex((draft) => draft.ID === ID);
  if (index !== undefined) {
    draft.exchanges[index] = {
      ...draft.exchanges[index],
      ...props,
    } as DigestedConversationListItem;
  }
  return draft;
};

export default createConversationReducer;
