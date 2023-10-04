import { produce } from "immer";
import { LOG, LOG_COLORS } from "src/utility/logger";

import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
  AppEventsReducerActionsType,
  EventPropsPayloadType,
} from "./types";

const eventsReducer = produce(
  (
    draft: AppEventsType,
    action: AppEventsReducerActionsType,
  ): AppEventsType => {
    switch (action.type) {
      case APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION:
        return BlockedConversation(draft, action.payload.name);
      case APP_EVENTS_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN:
        return ConversationSeen(draft, action.payload.name);
      case APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE: {
        return CreateRouteEvent(draft, action.payload);
      }
      case APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE: {
        return UpdateRouteEvent(draft, action.payload);
      }
      default:
        return draft;
    }
  },
);

const BlockedConversation = (draft: AppEventsType, name: string) => {
  LOG(LOG_COLORS.FgGreen, "MESSAGE_APP_BLOCK_CONVERSATION", name);
  draft.Messages[name].blocked = true;
  draft.Messages[name].blockedAt = new Date().toISOString();
  return draft;
};

const ConversationSeen = (draft: AppEventsType, name: string) => {
  LOG(LOG_COLORS.FgGreen, "MESSAGE_APP_CONVERSATION_SEEN", name);
  draft.Messages[name].views.push(new Date());
  return draft;
};

const CreateRouteEvent = (
  draft: AppEventsType,
  payload: EventPropsPayloadType,
) => {
  const { routeId, name, notification, ...props } = payload;
  const routeInfo = draft.Messages[name].routes;
  const stringRouteID = routeId.toString();

  const position = routeInfo[stringRouteID]
    ? routeInfo[stringRouteID].position
    : Object.keys(routeInfo).length + 1;
  const time = new Date().toISOString();
  const messageTimestamp = [] as string[];
  const startingIndex = props.atIndex ? props.atIndex - 1 : 0;
  messageTimestamp[startingIndex] = time;
  routeInfo[stringRouteID] = {
    createdAt: time,
    updatedAt: time,
    messageTimestamps: messageTimestamp,
    position,
    ...props,
  };

  LOG(LOG_COLORS.FgGreen, "MESSAGE_APP_ROUTE_CREATE", stringRouteID, props);
  if (notification) {
    draft.NOTIFICATIONS.push(notification);
  }
  return draft;
};

const UpdateRouteEvent = (
  draft: AppEventsType,
  payload: Omit<EventPropsPayloadType, "logline"> & { logline?: string },
) => {
  const { routeId, name, ...props } = payload;
  const stringRouteID = routeId.toString();
  const route = draft.Messages[name].routes[stringRouteID];

  LOG(
    LOG_COLORS.FgGreen,
    "MESSAGE_APP_ROUTE_UPDATED",
    routeId.toString(),
    props,
  );
  if (props.atIndex) {
    route.messageTimestamps[props.atIndex - 1] = new Date().toISOString();
  }
  draft.Messages[name].routes[stringRouteID] = {
    ...route,
    ...props,
    ...{ updatedAt: new Date().toISOString() },
  };
  return draft;
};

export default eventsReducer;
