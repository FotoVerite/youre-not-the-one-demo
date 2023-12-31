import { NOTIFICATION_ON_PRESS } from "@Components/notifications/reducer/types";
import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { produce } from "immer";
import { LOG, LOG_COLORS } from "src/utility/logger";

import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
  AppEventsReducerActionsType,
  EventPropsPayloadType,
  CreateMessageEventPayloadType,
} from "./types";

const eventsReducer = produce(
  (
    draft: AppEventsType,
    action: AppEventsReducerActionsType
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
  }
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
  payload: CreateMessageEventPayloadType
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
  return draft;
};

const UpdateRouteEvent = (
  draft: AppEventsType,
  payload: Omit<EventPropsPayloadType, "logline"> & {
    logline?: string;
    notify?: boolean;
  }
) => {
  const { routeId, notify, ...props } = payload;
  const name = payload.name as MESSAGE_CONTACT_NAME;
  const stringRouteID = routeId.toString();
  const route = draft.Messages[name].routes[stringRouteID];

  LOG(
    LOG_COLORS.FgGreen,
    "MESSAGE_APP_ROUTE_UPDATED",
    routeId.toString(),
    props
  );
  const { messageTimestamps, ...restOfProps } = props;
  if (restOfProps.atIndex && !messageTimestamps) {
    route.messageTimestamps[restOfProps.atIndex - 1] = new Date().toISOString();
  }
  if (messageTimestamps)
    route.messageTimestamps = route.messageTimestamps.concat(messageTimestamps);
  draft.Messages[name].routes[stringRouteID] = {
    ...route,
    ...restOfProps,
    ...{ updatedAt: new Date().toISOString() },
  };
  if (notify && props.status === ROUTE_STATUS_TYPE.FINISHED) {
    const route = draft.Messages[name].routes[stringRouteID];
    const notification = {
      ID: `${stringRouteID}-${name}`,
      title: `Message from ${name}`,
      content: route.logline || "",
      image: MESSAGE_CONTACT_INFO[name].avatar,
      onPress: {
        type: NOTIFICATION_ON_PRESS.CONVERSATION,
        payload: { name },
      },
    };
    draft.notificationPayload = notification;
  }
  return draft;
};

export default eventsReducer;
