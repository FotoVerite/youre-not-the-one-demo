import { AppEventsType } from "@Components/appEvents/reducer/types";
import moment from "moment";

import {
  ConversationFileType,
  ExchangeBlockType,
  MessageContentType,
} from "./types";
import { MESSAGE_CONTENT, isContentWithMeta } from "../contentWithMetaTypes";

export const formatConversationTime = (timestamp: string): string => {
  const now = moment();
  const date = moment(timestamp);
  if (now.diff(date, "day") === 0) {
    return date.format("h:mm a");
  } else if (now.diff(date, "week") === 0) {
    return date.format("dddd");
  } else {
    return date.format("MM/DD/YYYY");
  }
};

export const getLastMessageFromExchanges = (exchanges: ExchangeBlockType[]) => {
  const exchange = exchanges.slice(-1)[0];
  if (exchange == null) {
    return "";
  }
  const message = exchange.messages.slice(-1)[0];
  if (message == null) {
    return "";
  }
  return message;
};

export const convertMessageToString = (message: MessageContentType) => {
  if (isContentWithMeta(message)) {
    switch (message.type) {
      case MESSAGE_CONTENT.IMAGE:
        return "Attachment 1: Image";
      case MESSAGE_CONTENT.NUMBER:
        return `${message.content}`;
      case MESSAGE_CONTENT.SNAPSHOT:
        return "Send Snapshot";
      case MESSAGE_CONTENT.BACKGROUND_SNAPSHOT:
        return "Send Snapshot";
      case MESSAGE_CONTENT.VCARD:
        return `${message.content} Contact Card`;
      default:
        return message.content;
    }
  } else {
    return message;
  }
};

export const determineLoglineAndTimeOfLastMessage = (
  conversation: ConversationFileType,
  events: AppEventsType
) => {
  const routes = Object.entries(
    events.Messages[conversation.name].routes
  ).filter(([, event]) => event.logline);

  if (routes.length === 0) {
    const lastExchange = conversation.exchanges.slice(-1)[0];
    return {
      time: lastExchange.time,
      logline: convertMessageToString(
        getLastMessageFromExchanges(lastExchange.exchanges)
      ),
    };
  }
  const [, event] = routes.sort(([, a], [, b]) =>
    new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1
  )[0];
  return { time: event.updatedAt, logline: event.logline! };
};
