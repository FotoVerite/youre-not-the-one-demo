import { ImageSourcePropType } from "react-native";

import { MESSAGE_CONTACT_NAME } from "../../constants";
import {
  ContentWithMetaType,
  MessageEffectType,
} from "../contentWithMetaTypes";
import {
  MessageRouteType,
  NotificationRouteType,
  RouteConditionsType,
} from "../routes/types";

export enum EFFECT_TYPE {
  FULL_REPLACEMENT,
  GLITCH,
  LOGLINE_REPLACEMENT,
  SNAPSHOT,
}

export type MessageContentType = string | ContentWithMetaType;

export type ExchangeBlockType = {
  name: MESSAGE_CONTACT_NAME;
  messages: MessageContentType[];
};

export type ConversationExchangeType = {
  time: string;
  exchanges: ExchangeBlockType[];
};

export type ConversationType = {
  availableEventRoutes?: number[];
  blockable?: boolean;
  blocked?: boolean;
  conditions?: RouteConditionsType;
  effects?: MessageEffectType[];
  notificationRoutes?: NotificationRouteType[];
  exchanges: ConversationExchangeType[];
  group?: boolean;
  hasAvailableRoute?: boolean;
  heroImage: ImageSourcePropType;
  interfaceColor: string;
  logline_content: string;
  logline_timestamp: string;
  name: MESSAGE_CONTACT_NAME;
  routes: MessageRouteType[];
  tags: string[];
};
export type ConversationRecords = Record<
  MESSAGE_CONTACT_NAME,
  ConversationType
>;
export type ConversationListType = Pick<
  ConversationType,
  | "effects"
  | "heroImage"
  | "hasAvailableRoute"
  | "interfaceColor"
  | "name"
  | "logline_timestamp"
  | "logline_content"
  | "tags"
>;

export type ConversationListItemType = Omit<ConversationListType, "tags">;

export type ConversationFileType = Omit<
  ConversationType,
  | "hasAvailableRoute"
  | "logline_content"
  | "logline_timestamp"
  | "availableEventRoutes"
>;
