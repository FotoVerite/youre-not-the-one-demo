import { AppEventsType } from "@Components/appEvents/reducer/types";
import moment, { Moment } from "moment";

import {
  ConversationFileType,
  ExchangeBlockType,
  MessageContentType,
} from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import { MESSAGE_CONTENT, isContentWithMeta } from "../contentWithMetaTypes";
import { getLastSeenRoute, getUnfinishedRouteID } from "../routes/seen";

export const convertPathToExchanges = (path: ExchangeBlockType[]) => {
  return path.reduce(
    (acc, block) => {
      for (const [, message] of block.messages.entries()) {
        acc.push({ name: block.name, content: message });
      }
      return acc;
    },
    [] as { name: MESSAGE_CONTACT_NAME; content: MessageContentType }[]
  );
};

const getSeenExchangesFromUnfinishedRoute = (
  id: string,
  conversation: ConversationFileType,
  events: AppEventsType
) => {
  const event = events.Messages[conversation.name].routes[id];
  const route = conversation.routes?.find((r) => r.id.toString() === id);
  if (event && route && event.chosen && event.atIndex) {
    const path = convertPathToExchanges(route.routes[event.chosen]);
    const seen = path.splice(0, event.atIndex);
    return [event.updatedAt, seen] as const;
  } else {
    return [undefined, undefined] as const;
  }
};

export const formatConversationTime = (date: Moment): string => {
  const now = moment();
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
): { time: string; content: string } => {
  const { name, routes, notificationRoutes } = conversation;
  const routeEvent = getLastSeenRoute(name, events, routes, notificationRoutes);
  const unfinishedID = getUnfinishedRouteID(name, events, routes);
  if (unfinishedID != null) {
    const [updatedAt, seen] = getSeenExchangesFromUnfinishedRoute(
      unfinishedID,
      conversation,
      events
    );
    if (seen && seen.length > 0) {
      const lastExchange = seen.pop()!;
      return {
        time: formatConversationTime(moment(updatedAt)),
        content: convertMessageToString(lastExchange.content),
      };
    }
  }
  if (routeEvent == null) {
    const lastExchange = conversation.exchanges.slice(-1)[0];
    const date = moment(lastExchange?.time || "");

    const message = getLastMessageFromExchanges(lastExchange.exchanges);
    return {
      time: formatConversationTime(date),
      content: convertMessageToString(message),
    };
  } else {
    const message = getLastMessageFromExchanges(routeEvent.exchanges);
    return {
      time: formatConversationTime(moment(routeEvent.updatedAt)),
      content: convertMessageToString(message),
    };
  }
};
