import { AppEventsReducerActionsType } from "@Components/appEvents/reducer/types";
import {
  Glyph,
  SkFont,
  SkImage,
  SkPath,
  SkPoint,
} from "@shopify/react-native-skia";
import { FlexAlignType, ImageSourcePropType } from "react-native";

import { MESSAGE_CONTACT_NAME } from "../../../constants";
import {
  FontAwesomeGlyphs,
  MESSAGE_CONTENT,
  MessageEffectType,
  ReactionType,
} from "../../contentWithMetaTypes";
import { MessageRouteType } from "../../routes/types";
import {
  ConversationType,
  MessageContentType,
} from "../../useConversations/types";

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
  isLastInExchange: boolean;
  contentDelay?: number;
  typingDelay?: number;
  lastMessageSent?: boolean;
  deliveredOnly?: boolean;
  readTimeStamp?: Date;
}

export interface DigestedConversationTimeType
  extends AbstractDigestedConversationItemType {
  content: string;
  alignItems: undefined;
  type: MESSAGE_CONTENT.TIME;
}

export interface AbstractMetaDigestedConversationItemType
  extends AbstractDigestedConversationItemType {
  alignItems: FlexAlignType;
  avatar?: ImageSourcePropType;
  colors: string[];
  cursorVector: SkPoint;
  effect?: MessageEffectType;
  group?: boolean;
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
  | DigestedConversationBackgroundSnapShotItemType
  | DigestedConversationSnapShotItemType
  | DigestedConversationStringItemType
  | DigestedConversationVCardItemType;

export type BubbleItemType = Exclude<
  DigestedConversationListItem,
  DigestedConversationTimeType
>;

export type MessagePayloadType = {
  messageContent: MessageContentType;
  name: MESSAGE_CONTACT_NAME;
  isLastInExchange: boolean;
};

export type DigestedConversationType = Omit<
  ConversationType,
  "exchanges" | "blocked" | "hasAvailableRoute"
> & {
  activePath: MessagePayloadType[];
  availableRoute?: MessageRouteType;
  chosenRoute?: string;
  eventAction?: AppEventsReducerActionsType;
  nextMessageInQueue?: MessageContentType;
  exchanges: DigestedConversationListItem[];
  routeAtIndex?: number;
};

export type DigestedMessageProps = {
  [index in keyof DigestedConversationListItem]?: DigestedConversationListItem[index];
};
