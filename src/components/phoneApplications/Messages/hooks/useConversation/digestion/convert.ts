import { MessageAppEventsContainerType } from "@Components/appEvents/reducer/types";
import { Moment } from "moment";

import { reduceRoute } from "./routeReducers";
import { FinishedRouteType } from "../../routes/types";
import {
  ExchangeBlockType,
  ConversationType,
} from "../../useConversations/types";
import { createSkBubbleFromPayload } from "./SkFunctions/createSkBubble";
import { createTimeStampLabel } from "./SkFunctions/createTimeStampLabel";
import {
  SkItemConfigurationType,
  MessagePayloadType,
  DigestedConversationListItem,
} from "./types";

export const convertFromPayloadsToSkItems = (
  configuration: SkItemConfigurationType,
  payloads: MessagePayloadType[],
  time: string | Date
) => {
  const skTime = createTimeStampLabel(
    time,
    configuration.width,
    configuration.offset
  );
  configuration.offset += skTime.height;
  return payloads.reduce(
    (ret, payload) => {
      const item = createSkBubbleFromPayload(configuration, payload);
      configuration.offset += item.height + item.paddingBottom;
      ret.push(item);
      return ret;
    },
    [skTime] as DigestedConversationListItem[]
  );
};

export const convertBlockToMessagePayloadType = (
  block: ExchangeBlockType[],
  time?: Moment
) => {
  let blockIndex = 0;
  const timestamp = time ? time : undefined;
  return block.reduce((ret, exchange) => {
    const name = exchange.name;
    const size = exchange.messages.length - 1;
    return ret.concat(
      exchange.messages.map((messageContent, index) => {
        const message = {
          messageContent,
          name,
          isLastInExchange: size === index,
          index: blockIndex,
          timestamp: timestamp ? timestamp.toISOString() : undefined,
        } as MessagePayloadType;
        blockIndex += 1;
        if (timestamp) timestamp.add(30);
        return message;
      })
    );
  }, [] as MessagePayloadType[]);
};
