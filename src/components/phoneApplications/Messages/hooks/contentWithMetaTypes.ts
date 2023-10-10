import FontAwesome from "@expo/vector-icons/FontAwesome";

import { RouteConditionsType } from "./routes/types";
import { MESSAGE_CONTACT_NAME } from "../constants";
import { SkImage } from "@shopify/react-native-skia";

export enum MESSAGE_CONTENT {
  EMOJI = "emoji",
  TIME = "time",
  IMAGE = "image",
  GLYPH = "glyph",
  NUMBER = "number",
  BACKGROUND_SNAPSHOT = "background-snapshot",
  READ_LABEL = "read-label",
  SNAPSHOT = "snapshot",
  STRING = "string",
  VCARD = "vcard",
}

export enum EFFECT_TYPE {
  CONDITIONAL_EXCHANGE,
  GLITCH,
  LOGLINE_REPLACEMENT,
  SNAPSHOT,
  BACKGROUND_SNAPSHOT,
}

export type MessageEffectType = {
  type: EFFECT_TYPE;
  data: any;
  conditions?: RouteConditionsType;
};

export type FontAwesomeGlyphs = keyof typeof FontAwesome.glyphMap;

export type ReactionType = {
  name: FontAwesomeGlyphs;
  color: string;
  delay?: number;
};

interface AbstractContentWithMetaType {
  contentDelay?: number;
  conditions?: RouteConditionsType;
  leaveAsDelivered?: boolean;
  typingDelay?: number;
  reaction?: ReactionType;
  effect?: MessageEffectType;
}

export interface StringContentWithMeta extends AbstractContentWithMetaType {
  content: string;
  type: MESSAGE_CONTENT.STRING;
}

export interface ImageContentWithMeta extends AbstractContentWithMetaType {
  content: string;
  type: MESSAGE_CONTENT.IMAGE;
}

export interface EmojiContentWithMeta extends AbstractContentWithMetaType {
  content: string;
  type: MESSAGE_CONTENT.EMOJI;
}
export interface GlyphContentWithMeta extends AbstractContentWithMetaType {
  content: string;
  type: MESSAGE_CONTENT.GLYPH;
}

export interface NumberContentWithMeta extends AbstractContentWithMetaType {
  content: MESSAGE_CONTACT_NAME;
  type: MESSAGE_CONTENT.NUMBER;
}

export interface SnapshotContentWithMeta extends AbstractContentWithMetaType {
  type: MESSAGE_CONTENT.SNAPSHOT;
  content: { backup: string; filename: string };
}

export interface BackgroundSnapshotContentWithMeta
  extends AbstractContentWithMetaType {
  type: MESSAGE_CONTENT.BACKGROUND_SNAPSHOT;
  content: { backup: string; filename: string; image?: SkImage };
}

export interface VCardContentWithMeta extends AbstractContentWithMetaType {
  content: MESSAGE_CONTACT_NAME;
  type: MESSAGE_CONTENT.VCARD;
}
export type ContentWithMetaType =
  | BackgroundSnapshotContentWithMeta
  | EmojiContentWithMeta
  | GlyphContentWithMeta
  | ImageContentWithMeta
  | NumberContentWithMeta
  | StringContentWithMeta
  | SnapshotContentWithMeta
  | VCardContentWithMeta;

export const isContentWithMeta = (
  content: ContentWithMetaType | string
): content is ContentWithMetaType => {
  return (content as ContentWithMetaType).type !== undefined;
};

const SNAPSHOT_TYPES = [
  MESSAGE_CONTENT.SNAPSHOT,
  MESSAGE_CONTENT.BACKGROUND_SNAPSHOT,
];

export const isSnapshot = (
  content: ContentWithMetaType | string
): content is BackgroundSnapshotContentWithMeta | SnapshotContentWithMeta => {
  return isContentWithMeta(content) && SNAPSHOT_TYPES.includes(content.type);
};

export const isBackgroundSnapshot = (
  content: ContentWithMetaType | string
): content is BackgroundSnapshotContentWithMeta | SnapshotContentWithMeta => {
  return (
    isContentWithMeta(content) &&
    content.type === MESSAGE_CONTENT.BACKGROUND_SNAPSHOT
  );
};
