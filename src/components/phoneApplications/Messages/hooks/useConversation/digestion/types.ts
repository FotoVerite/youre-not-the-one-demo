import { AppEventsReducerActionsType } from "@Components/appEvents/reducer/types";
import { Glyph, SkFont, SkImage, SkPoint } from "@shopify/react-native-skia";
import { FlexAlignType, ImageSourcePropType } from "react-native";

import { MESSAGE_CONTACT_NAME } from "../../../constants";
import {
  FontAwesomeGlyphs,
  MESSAGE_CONTENT,
  MessageEffectType,
} from "../../contentWithMetaTypes";
import {
  DigestedMessageRouteType,
  DigestedNotificationRouteType,
  RouteConditionsType,
} from "../../routes/types";
import {
  ConversationType,
  MessageContentType,
} from "../../useConversations/types";

const SELF_NAMES_CONST = [
  MESSAGE_CONTACT_NAME.SELF,
  MESSAGE_CONTACT_NAME.MY_SELF,
];

export type GlyphContent = {
  font: SkFont;
  glyphs: Glyph[];
};

export type GlyphItemContentType = {
  text: GlyphContent;
  emoji: GlyphContent;
};

export type ImageDigestionPropsType = {
  image?: SkImage;
  backup: string;
  filename: string;
};

export interface BaseConfigType {
  font: SkFont;
  emojiFont: SkFont;
  width: number;
}

export interface SkItemConfigurationType extends BaseConfigType {
  group: boolean;
  offset: number;
}

export interface AbstractDigestedConversationItemType {
  ID: string;
  height: number;
  width: number;
  offset: number;
  paddingBottom: number;
  contentDelay?: number;
  typingDelay?: number;
  lastMessageSent?: boolean;
  deliveredOnly?: boolean;
  readTimeStamp?: Date;
}

export interface DigestedConversationTimeType
  extends AbstractDigestedConversationItemType {
  content: string;
  type: MESSAGE_CONTENT.TIME;
}

export interface DigestedConversationReadLabelType
  extends AbstractDigestedConversationItemType {
  content: string;
  type: MESSAGE_CONTENT.READ_LABEL;
}

export interface AbstractMetaDigestedConversationItemType
  extends AbstractDigestedConversationItemType {
  alignItems: FlexAlignType;
  avatar?: ImageSourcePropType;
  colors: string[];
  cursorVector: SkPoint;
  effect?: MessageEffectType;
  isLastInExchange: boolean;
  group?: boolean;
  leaveAsDelivered?: boolean;
  name: MESSAGE_CONTACT_NAME;
  addressee: boolean;
  reactionColor?: string;
  reactionDelay?: number;
  reactionName?: FontAwesomeGlyphs;
}

export interface DigestedConversationStringItemType
  extends AbstractMetaDigestedConversationItemType {
  content: React.JSX.Element[];
  type: MESSAGE_CONTENT.STRING;
}

export interface DigestedConversationGlyphItemType
  extends AbstractMetaDigestedConversationItemType {
  content: React.JSX.Element[];
  type: MESSAGE_CONTENT.GLYPH;
}

export interface DigestedConversationImageItemType
  extends AbstractMetaDigestedConversationItemType {
  content: string;
  type: MESSAGE_CONTENT.IMAGE;
}

export interface DigestedConversationEmojiItemType
  extends AbstractMetaDigestedConversationItemType {
  content: string;
  type: MESSAGE_CONTENT.EMOJI;
}

export interface DigestedConversationNumberItemType
  extends AbstractMetaDigestedConversationItemType {
  content: MESSAGE_CONTACT_NAME;
  type: MESSAGE_CONTENT.NUMBER;
}

export interface DigestedConversationSnapShotItemType
  extends AbstractMetaDigestedConversationItemType {
  content: ImageDigestionPropsType;
  type: MESSAGE_CONTENT.SNAPSHOT;
}

export interface DigestedConversationBackgroundSnapShotItemType
  extends AbstractMetaDigestedConversationItemType {
  content: ImageDigestionPropsType;
  type: MESSAGE_CONTENT.BACKGROUND_SNAPSHOT;
}

export interface DigestedConversationVCardItemType
  extends AbstractMetaDigestedConversationItemType {
  content: MESSAGE_CONTACT_NAME;
  type: MESSAGE_CONTENT.VCARD;
}

export type DigestedConversationListItem =
  | DigestedConversationEmojiItemType
  | DigestedConversationImageItemType
  | DigestedConversationGlyphItemType
  | DigestedConversationNumberItemType
  | DigestedConversationTimeType
  | DigestedConversationReadLabelType
  | DigestedConversationBackgroundSnapShotItemType
  | DigestedConversationSnapShotItemType
  | DigestedConversationStringItemType
  | DigestedConversationVCardItemType;

export type BubbleItemType = Exclude<
  DigestedConversationListItem,
  DigestedConversationTimeType | DigestedConversationReadLabelType
>;

export type DigestedLabelType =
  | DigestedConversationTimeType
  | DigestedConversationReadLabelType;

export type MessagePayloadType = {
  messageContent: MessageContentType;
  name: MESSAGE_CONTACT_NAME;
  isLastInExchange: boolean;
};

export type SentMessagePayloadType = {
  messageContent: MessageContentType;
  name: MESSAGE_CONTACT_NAME.SELF | MESSAGE_CONTACT_NAME.MY_SELF;
  isLastInExchange: boolean;
};

export type DigestedConversationType = Omit<
  ConversationType,
  "exchanges" | "blocked" | "hasAvailableRoute"
> & {
  activePath: MessagePayloadType[];
  seenRoutes: string[];
  availableRoute?: DigestedMessageRouteType | DigestedNotificationRouteType;
  chosenRoute?: string;
  cleanupAction?: AppEventsReducerActionsType;
  eventAction?: AppEventsReducerActionsType;
  nextMessageInQueue?: MessageContentType;
  receivingMessage?: boolean;
  previousExchangeProps?: Omit<DigestedBubbleProps, "ID"> & { ID: string };
  exchanges: DigestedConversationListItem[];
  routeAtIndex?: number;
};
export type DigestedMessageProps = {
  [index in keyof DigestedConversationListItem]?: DigestedConversationListItem[index];
};

export type DigestedBubbleProps = {
  [index in keyof BubbleItemType]?: BubbleItemType[index];
};

export type DigestedConversationWithChoosableRoute = Omit<
  DigestedConversationType,
  "availableRoute"
> & { availableRoute: DigestedMessageRouteType };

export type DigestedConversationWithNotificationRoute = Omit<
  DigestedConversationType,
  "availableRoute"
> & { availableRoute: DigestedNotificationRouteType };

export type DigestedConversationWithAvailableRoute = Omit<
  DigestedConversationType,
  "availableRoute"
> & {
  availableRoute: DigestedMessageRouteType | DigestedNotificationRouteType;
};

export type DigestedConversationWithConditionalBlockability = Omit<
  DigestedConversationType,
  "blockable"
> & { blockable: { conditions: RouteConditionsType } };

export const hasAvailableRoute = (
  draft: DigestedConversationType,
): draft is DigestedConversationWithAvailableRoute => {
  return draft.availableRoute != null;
};

export const hasStartedRoute = (
  draft: DigestedConversationType,
): draft is DigestedConversationWithAvailableRoute => {
  return (
    hasAvailableRoute(draft) &&
    draft.activePath != null &&
    draft.activePath.length > 0
  );
};

export const isSentMessage = (
  exchange: DigestedConversationListItem,
): exchange is BubbleItemType => {
  if (isDigestedLabel(exchange)) {
    return false;
  }
  return SELF_NAMES_CONST.includes(exchange.name);
};

export const isSentMessagePayload = (
  payload: MessagePayloadType,
): payload is SentMessagePayloadType => {
  return SELF_NAMES_CONST.includes(payload.name);
};

export const isReceivedMessage = (
  exchange: DigestedConversationListItem,
): exchange is BubbleItemType => {
  if (isDigestedLabel(exchange)) {
    return false;
  }
  return !isSentMessage(exchange);
};

export const isDigestedBubble = (
  exchange: DigestedConversationListItem,
): exchange is BubbleItemType => {
  return ![MESSAGE_CONTENT.TIME, MESSAGE_CONTENT.READ_LABEL].includes(
    exchange.type,
  );
};

export const isDigestedLabel = (
  exchange: DigestedConversationListItem,
): exchange is DigestedLabelType => {
  return !isDigestedBubble(exchange);
};

export const choosableRoute = (
  route: DigestedMessageRouteType | DigestedNotificationRouteType | undefined,
): route is DigestedMessageRouteType => {
  return route != null && route.hasOwnProperty("options");
};

export const hasChoosableRoute = (
  draft: DigestedConversationType,
): draft is DigestedConversationWithChoosableRoute => {
  return (
    draft.availableRoute != null &&
    draft.availableRoute.hasOwnProperty("options")
  );
};

export const hasBlockableConditions = (
  draft: DigestedConversationType,
): draft is DigestedConversationWithConditionalBlockability => {
  return (
    draft.blockable != null && draft.blockable.hasOwnProperty("conditions")
  );
};
