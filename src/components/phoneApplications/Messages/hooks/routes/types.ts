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

export enum ROUTE_STATUS_TYPE {
  AVAILABLE = "available",
  CONDITIONS_NOT_MET = "untriggered",
  STARTED = "started",
  FINISHED = "finished",
}

export type RouteChosenConditionType = {
  [key: string]: {
    chosen?: string[];
    not_chosen?: string[];
    status?: ROUTE_STATUS_TYPE;
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

export type OptionsWithConditionals = {
  conditions: RouteConditionsType;
  options: string[];
};
export interface ChoosableRouteType extends AbstractRouteType {
  options: string[] | OptionsWithConditionals[];
  routes: { [key: string]: ExchangeBlockType[] };
}
export interface NotificationRouteType extends AbstractRouteType {
  backgroundColor?: string;
  exchanges: ExchangeBlockType[];
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
  options: string[] | OptionsWithConditionals[];
  routes: { [choice: string]: MessagePayloadType[] };
};

export type DigestedNotificationRouteType = AbstractDigestedRouteType & {
  type: ROUTE_TYPE.NOTIFICATION;
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

export type StartedRouteType = ProcessedRouteType & {
  status: ROUTE_STATUS_TYPE.STARTED;
  indexAt: number;
  nextMessageInQueue?: string;
  pending: MessagePayloadType[];
  previousExchangeProps?: Omit<DigestedBubbleProps, "ID"> & { ID: string };
};
export type FinishedRouteType = ProcessedRouteType & {
  status: ROUTE_STATUS_TYPE.FINISHED;
};
// export type AvailableChoosableRoute = Omit<
//   DigestedChoosableRouteType,
//   "status" | "options"
// > & {
//   status: ROUTE_STATUS_TYPE.AVAILABLE;
//   options: string[];
// };

// export type DigestedNotificationRouteType = AbstractDigestedRouteType & {
//   type: ROUTE_TYPE.NOTIFICATION;
//   order: number;
//   exchanges: MessagePayloadType[];
//   status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET;
// };

// export type AvailableNotificationRoute = Omit<
//   DigestedNotificationRouteType,
//   "status"
// > & {
//   status: ROUTE_STATUS_TYPE.AVAILABLE;
// };

// export type FinishedRouteType = AbstractDigestedRouteType & {
//   createdAt: string;
//   status: ROUTE_STATUS_TYPE.FINISHED;
//   exchanges: MessagePayloadType[];
//   position: number;
//   updatedAt: string;
// };

// export type DigestedRouteType =
//   | DigestedChoosableRouteType
//   | DigestedNotificationRouteType;

// export type DigestedRoutesType = {
//   available: { [id: string]: DigestedRouteType };
//   seen: FinishedRouteType[];
//   started?: StartedRouteType;
// };
