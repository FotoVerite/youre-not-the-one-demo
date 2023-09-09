import { PHONE_APPLICATION_NAMES } from "src/constants/phoneApplicationNames";

enum CONTACT_NAMES {
  NAME = "NAME",
}

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
  [key in CONTACT_NAMES]: MessageAppEventsType;
};

export type AppEventsType = {
  [PHONE_APPLICATION_NAMES.MESSAGES]: MessageAppEventsContainerType;
};

export type AddMessageAppConversationSeenEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN;
  payload: { name: CONTACT_NAMES };
};
export type BlockMessageAppConversationEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION;
  payload: { name: CONTACT_NAMES };
};

export type CreateMessageAppRouteEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE;
  payload: {
    name: CONTACT_NAMES;
    routeId: number;
    chosen?: string;
    finished?: boolean;
    atIndex?: number;
  };
};

export type UpdateMessageAppRouteEventAction = {
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE;
  payload: {
    name: CONTACT_NAMES;
    routeId: number;
    finished?: boolean;
    atIndex?: number;
  };
};
export type AppEventsReducerActionsType =
  | AddMessageAppConversationSeenEventAction
  | BlockMessageAppConversationEventAction
  | CreateMessageAppRouteEventAction
  | UpdateMessageAppRouteEventAction;
