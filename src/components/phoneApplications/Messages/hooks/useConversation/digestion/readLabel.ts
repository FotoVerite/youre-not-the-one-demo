import { AppEventsType } from "@Components/appEvents/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { createReadLabel } from "./SkFunctions/createReadLabel";
import {
  BubbleItemType,
  DigestedConversationListItem,
  isDigestedBubble,
  isDigestedLabel,
} from "./types";
import { MESSAGE_CONTENT } from "../../contentWithMetaTypes";
import { StartedRouteType } from "../../routes/types";

type FilterType = {
  type: MESSAGE_CONTENT;
  index: number;
};
const filterByType = (
  exchanges: DigestedConversationListItem[],
  type: MESSAGE_CONTENT
): FilterType | undefined => {
  return exchanges
    .map((item, index) => {
      return {
        type: item.type,
        index,
      };
    })
    .filter((item) => item.type === type)
    .slice(-1)[0];
};

export const appendReadLabel = (
  exchanges: DigestedConversationListItem[],
  width: number,
  readTime?: string,
  leaveAsDelivered?: boolean
) => {
  const hasSentMessage =
    exchanges.filter(
      (e) => isDigestedBubble(e) && e.name === MESSAGE_CONTACT_NAME.SELF
    ).length > 0;
  if (!hasSentMessage) {
    return exchanges;
  }
  const previousRead =
    filterByType(exchanges, MESSAGE_CONTENT.READ_LABEL)?.index || -1;

  exchanges = markPreviousReadForRemoval(previousRead, exchanges);

  const spliceIndex =
    exchanges
      .map((item, index) => {
        return {
          name: isDigestedLabel(item) ? undefined : item.name,
          index,
        };
      })
      .filter((item) => item.name === MESSAGE_CONTACT_NAME.SELF)
      .slice(-1)[0].index + 1;

  const lastExchange = exchanges[spliceIndex - 1] as BubbleItemType;
  const readLabel = createReadLabel(
    readTime ? readTime : new Date().toISOString(),
    width,
    lastExchange.offset + lastExchange.height + lastExchange.paddingBottom,
    leaveAsDelivered || lastExchange.leaveAsDelivered,
    lastExchange.contentDelay
  );

  exchanges.splice(spliceIndex, 0, readLabel);
  return exchanges.map((item, index) => {
    if (index <= spliceIndex) {
      return item;
    } else {
      item.offset += readLabel.height;
      return item;
    }
  });
};

const markPreviousReadForRemoval = (
  previousIndex: number,
  exchanges: DigestedConversationListItem[]
) => {
  if (previousIndex === -1) {
    return exchanges;
  }
  const decrement = exchanges[previousIndex].height;
  exchanges[previousIndex].height = 0;
  return exchanges.map((item, index) => {
    if (index < previousIndex) {
      return item;
    } else {
      item.offset -= decrement;
      return item;
    }
  });
};
