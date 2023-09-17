import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { FontAwesomeGlyphs } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { PropsWithChildren } from "react";
import { FlexAlignType, ImageSourcePropType } from "react-native";

export type ConversationExchangeWrapperType = {
  addressee: boolean;
  alignItems: FlexAlignType;
  avatar?: ImageSourcePropType;
  colors: string[];
  group?: boolean;
  height: number;
  name: MESSAGE_CONTACT_NAME;
  paddingBottom: number;
  reactionName?: FontAwesomeGlyphs;
  reactionColor?: string;
  reactionAnimated?: boolean;
  reactionDelay?: number;
} & PropsWithChildren;
