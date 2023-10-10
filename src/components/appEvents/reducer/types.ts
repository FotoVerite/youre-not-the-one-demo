import { NotificationDataType } from "@Components/notifications/reducer/types";
import { SkImage } from "@shopify/react-native-skia";
import { Image } from "react-native-svg";
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
  createdAt: string;
  finished?: boolean;
  logline?: string;
  messageTimestamps: string[];
  position: number;
  updatedAt: string;
};

export type MessageRouteEventType = {
  [routeId: string]: MessageRouteEventDataType;
};

export type MessageAppEventsType = {
  views: Date[];
  routes: MessageRouteEventType;
  blocked: boolean;
  blockedAt?: string;
};

export type MessageAppEventsContainerType = {
  [key in MESSAGE_CONTACT_NAME]: MessageAppEventsType;
};

export type AppEventsType = {
  [PHONE_APPLICATION_NAMES.MESSAGES]: MessageAppEventsContainerType;
  ["NOTIFICATIONS"]: NotificationDataType[];
  ["CACHE"]: {
    [index in keyof typeof PHONE_APPLICATION_NAMES]: {
      [id: string]: SkImage | Image;
    };
  };
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
  atIndex?: number;
  chosen?: string;
  finished?: boolean;
  logline?: string;
  messageTimestamps?: string[];
  notification?: NotificationDataType;
  name: MESSAGE_CONTACT_NAME;
  routeId: string;
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
