import { MESSAGE_CONTACT_NAME } from "../../constants";
import {
  MessageEffectType,
  NEXT_MESSAGE_EFFECT_TYPE,
} from "../contentWithMetaTypes";
import {
  DigestedBubbleProps,
  MessagePayloadType,
} from "../useConversation/digestion/types";
import { ExchangeBlockType } from "../useConversations/types";

export enum ROUTE_TYPE {
  CHOOSE,
  NOTIFICATION,
}

export enum ROUTE_STATUS_TYPE {
  AVAILABLE = "available",
  CONDITIONS_NOT_MET = "untriggered",
  STARTED = "started",
  FINISHED = "finished",
}

export enum OPTION_EFFECT_TYPE {
  STATIC,
  MELT,
  GLITCH,
  DISPLAY_AFTER_OTHER_SELECTION,
}

export type RouteChosenConditionType = {
  [key: string]: {
    chosen?: string[];
    not_chosen?: string[];
    status?: ROUTE_STATUS_TYPE;
    timeSince?: number;
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

export interface AbstractRouteType {
  id: number;
  conditions?: RouteConditionsType | RouteConditionsType[];
  delay?: number;
  effects?: MessageEffectType[];
}

export type AbstractOptionType = {
  label: string;
  value: string;
  conditions?: RouteConditionsType;
  effect?: OPTION_EFFECT_TYPE;
  data?: string | string[];
};

export interface OptionType extends AbstractOptionType {}
export interface OptionTypeWithDisplayEffect extends AbstractOptionType {
  effect: OPTION_EFFECT_TYPE.DISPLAY_AFTER_OTHER_SELECTION;
  data: string[];
}

export interface OptionTypeWithShaderEffect extends AbstractOptionType {
  effect: OPTION_EFFECT_TYPE.MELT | OPTION_EFFECT_TYPE.GLITCH;
  data: string;
}

export interface ChoosableRouteType extends AbstractRouteType {
  options: string[] | OptionType[];

  routes: { [key: string]: ExchangeBlockType[] };
}
export interface NotificationRouteFileType extends AbstractRouteType {
  backgroundColor?: string;
  exchanges: ExchangeBlockType[];
  repeatable?: number;
}
export interface NotificationRouteType extends NotificationRouteFileType {
  status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET;
}

export interface AbstractDigestedRouteType
  extends Omit<AbstractRouteType, "id"> {
  id: string;
  name: MESSAGE_CONTACT_NAME;
  status: ROUTE_STATUS_TYPE;
  type: ROUTE_TYPE;
  createdAt?: string;
  updatedAt?: string;
}

// export interface DigestedRouteWithMultipleMeetableConditionsType
//   extends Omit<AbstractDigestedRouteType, "conditions"> {
//   conditions: RouteConditionsType[];
// }

export type DigestedChoosableRouteType = AbstractDigestedRouteType & {
  type: ROUTE_TYPE.CHOOSE;
  options: OptionType[];
  routes: { [choice: string]: MessagePayloadType[] };
};

export type DigestedNotificationRouteType = AbstractDigestedRouteType & {
  type: ROUTE_TYPE.NOTIFICATION;
  repeatable?: number;
  exchanges: MessagePayloadType[];
};

export type KickedOffRouteType = AbstractDigestedRouteType & {
  exchanges: MessagePayloadType[];
  status:
    | ROUTE_STATUS_TYPE.AVAILABLE
    | ROUTE_STATUS_TYPE.STARTED
    | ROUTE_STATUS_TYPE.FINISHED;
  createdAt: string;
  updatedAt: string;
  position: number;
};

export type UntriggeredRouteType = AbstractDigestedRouteType & {
  status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET;
};
export type AvailableRouteType = KickedOffRouteType & {
  status: ROUTE_STATUS_TYPE.AVAILABLE;
};

export type ProcessedRouteType = KickedOffRouteType & {
  status: ROUTE_STATUS_TYPE.STARTED | ROUTE_STATUS_TYPE.FINISHED;
};

export type NextMessageInQueue = {
  value: string;
  nextMessageEffect?: NEXT_MESSAGE_EFFECT_TYPE;
  data?: string[] | string;
};

export type StartedRouteType = ProcessedRouteType & {
  status: ROUTE_STATUS_TYPE.STARTED;
  indexAt: number;
  nextMessageInQueue?: NextMessageInQueue;
  pending: MessagePayloadType[];
  previousExchangeProps?: Omit<DigestedBubbleProps, "ID"> & { ID: string };
};
export type FinishedRouteType = ProcessedRouteType & {
  status: ROUTE_STATUS_TYPE.FINISHED;
};
