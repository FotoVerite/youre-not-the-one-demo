import { DigestedConversationListItem } from "./types";

export const BUBBLE_PADDING = 18;

export const getListHeight = (exchanges: DigestedConversationListItem[]) => {
  const lastNode = exchanges.slice(-1)[0];
  if (lastNode == null) {
    return 50;
  }
  return lastNode.offset + lastNode.height + lastNode.paddingBottom;
};
