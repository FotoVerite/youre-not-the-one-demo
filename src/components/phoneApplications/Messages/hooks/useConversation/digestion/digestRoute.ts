import { AppEventsType } from "@Components/appEvents/reducer/types";

import { getListHeight } from ".";
import { createSkBubbleFromPayload } from "./SkFunctions/createSkBubble";
import { createTimeStampLabel } from "./SkFunctions/createTimeStampLabel";
import {
  BaseConfigType,
  DigestedConversationListItem,
  DigestedConversationType,
  MessagePayloadType,
  SkItemConfigurationType,
} from "./types";
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
    time: route.createdAt.toISOString(),
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
    ret.concat(
      exchange.messages.map((messageContent, index) => {
        return {
          messageContent,
          name,
          isLastInExchange: size === index,
        } as MessagePayloadType;
      }),
    );
    return ret;
  }, [] as MessagePayloadType[]);

export const convertFromPayloadsToSkItems = (
  configuration: SkItemConfigurationType,
  payloads: MessagePayloadType[],
  time: string,
) => {
  const skTime = createTimeStampLabel(
    time,
    configuration.width,
    configuration.offset,
  );
  return payloads.reduce(
    (ret, payload) => {
      ret.push(createSkBubbleFromPayload(configuration, payload));
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
  const ret: DigestedConversationListItem[] = [];
  const itemConfiguration: SkItemConfigurationType = {
    font: configuration.font,
    emojiFont: configuration.emojiFont,
    width: configuration.width,
    offset,
    group,
  };
  conversationExchanges.reduce((ret, block) => {
    const payloads = convertBlockToMessagePayloadType(block.exchanges);
    ret.concat(
      convertFromPayloadsToSkItems(itemConfiguration, payloads, block.time),
    );
    return ret;
  }, [] as DigestedConversationListItem[]);

  return ret;
};
