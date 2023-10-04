import { MESSAGE_CONTACT_NAME } from "../../constants";
import { MessageEffectType } from "../contentWithMetaTypes";
import {
  DigestedBubbleProps,
  MessagePayloadType,
} from "../useConversation/digestion/types";
import { ExchangeBlockType } from "../useConversations/types";

export enum ROUTE_TYPE {
  CHOOSE,
  NOTIFICATION,
}

export enum ROUTE_STATE_TYPE {
  ACTIVE,
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export type RouteChosenConditionType = {
  [key: string]: {
    chosen?: string[];
    not_chosen?: string[];
    finished?: boolean;
  };
};

export type RouteBlockedConditionType = {
  [key: string]: { blocked: boolean };
};

export type RouteViewedConditionType = {
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type RouteConditionsType = {
  [key in MESSAGE_CONTACT_NAME]?: {
    views?: RouteViewedConditionType;
    routes?: RouteChosenConditionType;
    blocked?: boolean;
  };
};

interface AbstractRouteType {
  id: number;
  conditions?: RouteConditionsType;
  delay?: number;
  effects?: MessageEffectType[];
  
}

export interface AbstractDigestedRouteType
  extends Omit<AbstractRouteType, "id"> {
  id: string;
  name: MESSAGE_CONTACT_NAME;
  finished: ROUTE_STATE_TYPE;
  type: ROUTE_TYPE;
}

export interface ChoosableRouteType extends AbstractRouteType {
  options: string[];
  routes: { [key: string]: ExchangeBlockType[] };
}

export interface NotificationRouteType extends AbstractRouteType {
  backgroundColor?: string;
  exchanges: ExchangeBlockType[];
}

export type DigestedChoosableRouteType = AbstractDigestedRouteType & {
  type: ROUTE_TYPE.CHOOSE;
  order: number;
  options: string[];
  routes: { [choice: string]: MessagePayloadType[] };
  finished: ROUTE_STATE_TYPE.NOT_STARTED;
};

export type ActiveChoosableRoute = Omit<
  DigestedChoosableRouteType,
  "finished"
> & {
  finished: ROUTE_STATE_TYPE.ACTIVE;
};

export type DigestedNotificationRouteType = AbstractDigestedRouteType & {
  type: ROUTE_TYPE.NOTIFICATION;
  order: number;
  exchanges: MessagePayloadType[];
  finished: ROUTE_STATE_TYPE.NOT_STARTED;
};

export type ActiveNotificationRoute = Omit<
  DigestedNotificationRouteType,
  "finished"
> & {
  finished: ROUTE_STATE_TYPE.ACTIVE;
};

export type StartedRouteType = AbstractDigestedRouteType & {
  type: ROUTE_TYPE.CHOOSE;
  createdAt: string;
  chosen?: string;
  finished: ROUTE_STATE_TYPE.STARTED;
  exchanges: MessagePayloadType[];
  indexAt: number;
  nextMessageInQueue?: string;
  pending: MessagePayloadType[];
  previousExchangeProps?: Omit<DigestedBubbleProps, "ID"> & { ID: string };
  updatedAt: string;
};

export type FinishedRouteType = AbstractDigestedRouteType & {
  createdAt: string;
  finished: ROUTE_STATE_TYPE.FINISHED;
  exchanges: MessagePayloadType[];
  position: number;
  updatedAt: string;
};

export type DigestedRouteType =
  | DigestedChoosableRouteType
  | DigestedNotificationRouteType;

export type DigestedRoutesType = {
  available: { [id: string]: DigestedRouteType };
  seen: FinishedRouteType[];
  started?: StartedRouteType;
};
