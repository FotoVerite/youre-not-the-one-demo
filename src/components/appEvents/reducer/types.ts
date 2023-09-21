import {
  NotificationDataType,
  NotificationType,
} from "@Components/notifications/reducer/types";
import { PHONE_APPLICATION_NAMES } from "src/constants/phoneApplicationNames";

type MESSAGE_CONTACT_NAME = string;

//-----MESSAGES-----//

export enum APP_EVENTS_ACTIONS {
  MESSAGE_APP_CONVERSATION_SEEN,
  MESSAGE_APP_BLOCK_CONVERSATION,
  MESSAGE_APP_ROUTE_CREATE,
  MESSAGE_APP_ROUTE_UPDATE,
}

export type MessageRouteEventDataType = {
  atIndex?: number;
  chosen?: string;
  createdAt: Date;
  finished?: boolean;
  position: number;
  updatedAt: Date;
};

export type MessageRouteEventType = {
  [routeId: string]: MessageRouteEventDataType;
};

export type MessageAppEventsType = {
  views: Date[];
  routes: MessageRouteEventType;
  blocked: boolean;
};

export type MessageAppEventsContainerType = {
  [key in MESSAGE_CONTACT_NAME]: MessageAppEventsType;
};

export type AppEventsType = {
  [PHONE_APPLICATION_NAMES.MESSAGES]: MessageAppEventsContainerType;
  ["NOTIFICATIONS"]: NotificationDataType[];
};

export type AddMessageAppConversationSeenEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN;
  payload: { name: MESSAGE_CONTACT_NAME };
};
export type BlockMessageAppConversationEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION;
  payload: { name: MESSAGE_CONTACT_NAME };
};

export type EventPropsPayloadType = {
  name: MESSAGE_CONTACT_NAME;
  routeId: number;
  chosen?: string;
  finished?: boolean;
  atIndex?: number;
  notification?: NotificationDataType;
};

export type CreateMessageAppRouteEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE;
  payload: EventPropsPayloadType;
};

export type UpdateMessageAppRouteEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE;
  payload: EventPropsPayloadType;
};
export type AppEventsReducerActionsType =
  | AddMessageAppConversationSeenEventAction
  | BlockMessageAppConversationEventAction
  | CreateMessageAppRouteEventAction
  | UpdateMessageAppRouteEventAction;
