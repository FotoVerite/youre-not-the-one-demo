import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { Vector, SkFont } from "@shopify/react-native-skia";
import { Image, ImageSourcePropType } from "react-native";

import {
  calculatedItemWidth,
  GetDimensionsAndSkiaNodes,
} from "./skiaCalculations";
import { BUBBLE_PADDING } from "..";
import {
  ContentWithMetaType,
  MESSAGE_CONTENT,
} from "../../../contentWithMetaTypes";
import { SkItemConfigurationType, BubbleItemType } from "../types";

type CalculationsType = {
  height: number;
  width: number;
  content:
    | string
    | React.JSX.Element[]
    | { filename: string; backup: string }
    | MESSAGE_CONTACT_NAME;
  cursorVector: Vector;
};

export const SkMessage = (
  itemConfiguration: SkItemConfigurationType,
  message: ContentWithMetaType,
  name: MESSAGE_CONTACT_NAME,
  isLastInExchange: boolean
) => {
  const DEFAULT_BOTTOM_PADDING = 4;
  const BOTTOM_PADDING_FOR_LAST_IN_BLOCK = 8;
  const ADDED_HEIGHT_FOR_VISIBLE_NAME = 20;
  const { group, width, offset, font } = itemConfiguration;
  const leftSide = name !== "Self";

  const calculations = calculateWidthHeightAndContent(
    message,
    width,
    leftSide,
    font
  );

  const skItem = {
    alignItems: leftSide ? "flex-start" : "flex-end",
    content: calculations.content,
    height:
      group && isLastInExchange && name !== MESSAGE_CONTACT_NAME.SELF
        ? calculations.height + ADDED_HEIGHT_FOR_VISIBLE_NAME
        : calculations.height,
    width: calculations.width,
    paddingBottom: isLastInExchange
      ? BOTTOM_PADDING_FOR_LAST_IN_BLOCK
      : DEFAULT_BOTTOM_PADDING,
    name,
    offset,
    colors: MESSAGE_CONTACT_INFO[name].colors,
    cursorVector: calculations.cursorVector,
    avatar: isLastInExchange ? MESSAGE_CONTACT_INFO[name].avatar : undefined,
    leftSide,
    isLastInExchange,
    type: message.type,
    reaction: message.reaction,
    contentDelay: message.contentDelay,
    typingDelay: message.typingDelay,
    effect: message.effect,
  } as BubbleItemType;

  return skItem;
};

const createPath = (
  calculations: CalculationsType,
  tail: boolean,
  flip: boolean
) => {
  const clip = BubblePath(calculations.width, calculations.height, 16, tail);
  if (flip) {
    flipPath(clip, calculations.width);
  }
  return clip;
};

const calculateWidthHeightAndContent = (
  message: ContentWithMetaType,
  width: number,
  leftSide: boolean,
  font: SkFont
): CalculationsType => {
  const itemWidth = leftSide ? width * 0.7 - 30 : width * 0.7;
  switch (message.type) {
    case MESSAGE_CONTENT.EMOJI:
      return {
        width: itemWidth,
        height: 60,
        content: message.content,
        cursorVector: { x: itemWidth + 2, y: 0 },
      };
    case MESSAGE_CONTENT.SNAPSHOT:
      return {
        width: itemWidth,
        height: 0,
        content: message.content,
        cursorVector: { x: itemWidth + 2, y: 0 },
      };
    case MESSAGE_CONTENT.BACKGROUND_SNAPSHOT:
      return {
        width: itemWidth,
        height: 1000,
        content: message.content,
        cursorVector: { x: itemWidth + 2, y: 0 },
      };
    case MESSAGE_CONTENT.IMAGE: {
      const imageDimensions = Image.resolveAssetSource(
        message.content as ImageSourcePropType
      );
      const aspectRation = imageDimensions.height / imageDimensions.width;
      const imageHeight = itemWidth * aspectRation;
      return {
        width: itemWidth,
        height: imageHeight,
        content: message.content,
        cursorVector: { x: itemWidth + 2, y: 0 },
      };
    }
    case MESSAGE_CONTENT.NUMBER:
      return {
        width: calculatedItemWidth(font, message.content, itemWidth),
        height: 30,
        content: message.content,
        cursorVector: { x: itemWidth + 2, y: 0 },
      };
    case MESSAGE_CONTENT.STRING: {
      const [boxHeight, boxWidth, textNodes, cursorVector] =
        GetDimensionsAndSkiaNodes(font, font, message.content, width, leftSide);
      return {
        width: boxWidth,
        height: boxHeight + BUBBLE_PADDING,
        content: textNodes,
        cursorVector,
      };
    }
    case MESSAGE_CONTENT.GLYPH: {
      const [glyphHeight, glyphWidth, glyphNodes] = GetDimensionsAndSkiaNodes(
        font,
        font,
        message.content,
        width,
        leftSide
      );
      return {
        width: glyphWidth,
        height: glyphHeight,
        content: glyphNodes,
        cursorVector: { x: 1, y: 1 },
      };
    }
    case MESSAGE_CONTENT.VCARD:
      return {
        width: 180,
        height: 60,
        content: message.content as MESSAGE_CONTACT_NAME,
        cursorVector: { x: 180 + 2, y: 0 },
      };
    default:
      return {
        width: itemWidth,
        height: 60,
        content: "",
        cursorVector: { x: itemWidth + 2, y: 0 },
      };
  }
};
