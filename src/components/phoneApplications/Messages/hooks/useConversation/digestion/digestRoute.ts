import { AppEventsType } from "@Components/appEvents/reducer/types";

import { createSkBubbleFromPayload } from "./SkFunctions/createSkBubble";
import { createTimeStampLabel } from "./SkFunctions/createTimeStampLabel";
import {
  BaseConfigType,
  DigestedConversationListItem,
  DigestedConversationType,
  MessagePayloadType,
  SkItemConfigurationType,
} from "./types";
import { getListHeight } from "./utility";
import { RouteObjectType, getSeenRoutes } from "../../routes/seen";
import {
  ConversationExchangeType,
  ExchangeBlockType,
} from "../../useConversations/types";

export const appendSeenRoutes = (
  digested: DigestedConversationType,
  event: AppEventsType,
  config: BaseConfigType,
) => {
  if (digested.routes == null) {
    return digested.exchanges;
  }
  const seenRoutes = getSeenRoutes(
    digested.name,
    event,
    digested.routes,
    digested.notificationRoutes,
  );
  digested.seenRoutes = seenRoutes.map((route) => route.routeId);
  return seenRoutes.reduce((digestedExchanges, routes) => {
    return appendRoute(digestedExchanges, routes, digested.group, config);
  }, digested.exchanges);
};

export const appendRoute = (
  exchanges: DigestedConversationListItem[],
  route: RouteObjectType,
  group: boolean = false,
  config: BaseConfigType,
) => {
  const offset = getListHeight(exchanges);
  const conversationBlock: ConversationExchangeType = {
    time: route.createdAt,
    exchanges: route.exchanges,
  };
  return exchanges.concat(
    digestExchanges(config, [conversationBlock], group, offset),
  );
};

export const convertBlockToMessagePayloadType = (block: ExchangeBlockType[]) =>
  block.reduce((ret, exchange) => {
    const name = exchange.name;
    const size = exchange.messages.length - 1;
    return ret.concat(
      exchange.messages.map((messageContent, index) => {
        return {
          messageContent,
          name,
          isLastInExchange: size === index,
        } as MessagePayloadType;
      }),
    );
  }, [] as MessagePayloadType[]);

export const convertFromPayloadsToSkItems = (
  configuration: SkItemConfigurationType,
  payloads: MessagePayloadType[],
  time: string | Date,
) => {
  const skTime = createTimeStampLabel(
    time,
    configuration.width,
    configuration.offset,
  );
  configuration.offset += skTime.height;
  return payloads.reduce(
    (ret, payload) => {
      const item = createSkBubbleFromPayload(configuration, payload);
      configuration.offset += item.height + item.paddingBottom;
      ret.push(item);
      return ret;
    },
    [skTime] as DigestedConversationListItem[],
  );
};

export const digestExchanges = (
  configuration: BaseConfigType,
  conversationExchanges: ConversationExchangeType[],
  group: boolean = false,
  offset: number = 50,
) => {
  const itemConfiguration: SkItemConfigurationType = {
    font: configuration.font,
    emojiFont: configuration.emojiFont,
    width: configuration.width,
    offset,
    group,
  };
  return conversationExchanges.reduce((ret, block) => {
    const payloads = convertBlockToMessagePayloadType(block.exchanges);
    return ret.concat(
      convertFromPayloadsToSkItems(itemConfiguration, payloads, block.time),
    );
  }, [] as DigestedConversationListItem[]);
};
