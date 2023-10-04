import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { SkMessage } from "./skMessage";
import {
  isContentWithMeta,
  MESSAGE_CONTENT,
} from "../../../contentWithMetaTypes";
import {
  ExchangeBlockType,
  MessageContentType,
} from "../../../useConversations/types";
import { SkItemConfigurationType, MessagePayloadType } from "../types";

export const createSkBubbleFromExchange = (
  itemConfiguration: SkItemConfigurationType,
  exchange: ExchangeBlockType,
  index: number,
) => {
  const message = exchange.messages[index];
  const lastInExchange = index === exchange.messages.length - 1;
  return createSkBubbleFromMessage(
    itemConfiguration,
    message,
    exchange.name,
    lastInExchange,
  );
};

export const createSkBubbleFromMessage = (
  itemConfiguration: SkItemConfigurationType,
  message: MessageContentType,
  name: MESSAGE_CONTACT_NAME,
  lastInExchange: boolean,
) => {
  if (!isContentWithMeta(message)) {
    message = { type: MESSAGE_CONTENT.STRING, content: message };
  }
  return SkMessage(itemConfiguration, message, name, lastInExchange);
};

export const createSkBubbleFromPayload = (
  itemConfiguration: SkItemConfigurationType,
  payload: MessagePayloadType,
) => {
  const { name, isLastInExchange, timestamp } = payload;
  let message = payload.messageContent;
  if (!isContentWithMeta(message)) {
    message = {
      type: MESSAGE_CONTENT.STRING,
      content: message,
    };
  }
  return SkMessage(
    itemConfiguration,
    message,
    name,
    isLastInExchange,
    timestamp,
  );
};
