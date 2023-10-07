import { DigestedConversationListItem, MessagePayloadType } from "./types";
import { ExchangeBlockType } from "../../useConversations/types";

export const BUBBLE_PADDING = 18;

export const getListHeight = (exchanges: DigestedConversationListItem[]) => {
  const lastNode = exchanges.slice(-1)[0];
  if (lastNode == null) {
    return 50;
  }
  return lastNode.offset + lastNode.height + lastNode.paddingBottom;
};

export const digestBlockAndFilterSkipped = (
  block: ExchangeBlockType[],
  timestamps: string[],
) => {
  let blockIndex = 0;
  return block.reduce((ret, exchange) => {
    const name = exchange.name;
    let size = exchange.messages.length - 1;
    exchange.messages.forEach((messageContent, index) => {
      if (timestamps[blockIndex] == null) {
        blockIndex += 1;
        size -= 1;
        return;
      }
      ret.push({
        messageContent,
        name,
        isLastInExchange: size === index,
        timestamp: timestamps[blockIndex],
        index: blockIndex,
      });
      blockIndex += 1;
    });
    return ret;
  }, [] as MessagePayloadType[]);
};
