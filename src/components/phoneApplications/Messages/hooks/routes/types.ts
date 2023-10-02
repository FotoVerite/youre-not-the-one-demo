import { MESSAGE_CONTACT_NAME } from "../../constants";
import { MessageEffectType } from "../contentWithMetaTypes";
import { ExchangeBlockType } from "../useConversations/types";

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

export type MessageRouteType = {
  id: number;
  conditions?: RouteConditionsType;
  effects?: MessageEffectType[];
  options: string[];
  routes: { [key: string]: ExchangeBlockType[] };
};

export type DigestedMessageRouteType = MessageRouteType & {
  name: MESSAGE_CONTACT_NAME;
};

export type NotificationRouteType = {
  id: number;
  backgroundColor?: string;
  delay?: number;
  conditions?: RouteConditionsType;
  exchanges: ExchangeBlockType[];
};

export type DigestedNotificationRouteType = NotificationRouteType & {
  name: MESSAGE_CONTACT_NAME;
};
