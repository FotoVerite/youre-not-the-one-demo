import moment from "moment";

import {
  convertBlockToMessagePayloadType,
  convertFromPayloadsToSkItems,
} from "./convert";
import {
  DigestedConversationType,
  BaseConfigType,
  DigestedConversationListItem,
  SkItemConfigurationType,
} from "./types";
import { getListHeight } from "./utility";
import { FinishedRouteType, ProcessedRouteType } from "../../routes/types";
import { ConversationExchangeType } from "../../useConversations/types";

export const appendExchanges = (
  conversationExchanges: ConversationExchangeType[],
  configuration: SkItemConfigurationType
) => {
  return conversationExchanges.reduce((ret, block) => {
    const payloads = convertBlockToMessagePayloadType(
      block.exchanges,
      moment(block.time)
    );
    return ret.concat(
      convertFromPayloadsToSkItems(configuration, payloads, block.time)
    );
  }, [] as DigestedConversationListItem[]);
};

export const appendSeenRoutes = (
  digested: DigestedConversationType,
  seenRoutes: FinishedRouteType[],
  config: BaseConfigType
) => {
  return seenRoutes.reduce(
    (digestedExchanges, route) =>
      appendFromDigestedRoute(digestedExchanges, route, digested.group, config),
    digested.exchanges
  );
};

export const appendFromDigestedRoute = (
  exchanges: DigestedConversationListItem[],
  route: ProcessedRouteType,
  group: boolean = false,
  config: BaseConfigType
) => {
  const offset = getListHeight(exchanges);
  const itemConfiguration: SkItemConfigurationType = {
    font: config.font,
    emojiFont: config.emojiFont,
    width: config.width,
    offset,
    group,
  };
  return exchanges.concat(
    convertFromPayloadsToSkItems(
      itemConfiguration,
      route.exchanges,
      route.createdAt
    )
  );
};
