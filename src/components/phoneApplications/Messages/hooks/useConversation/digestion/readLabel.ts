import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { createReadLabel } from "./SkFunctions/createReadLabel";
import { DigestedConversationListItem, isDigestedLabel } from "./types";
import { MESSAGE_CONTENT } from "../../contentWithMetaTypes";

export const appendReadLabel = (
  exchanges: DigestedConversationListItem[],
  width: number,
) => {
  const previousRead =
    exchanges
      .map((item, index) => {
        return {
          type: item.type,
          index,
        };
      })
      .filter((item) => item.type === MESSAGE_CONTENT.READ_LABEL)
      .slice(-1)[0]?.index || -1;

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

  const readLabel = createReadLabel(
    new Date().toISOString(),
    width,
    exchanges[spliceIndex - 1].offset,
  );
  exchanges.splice(spliceIndex, 0, readLabel);
  return exchanges.map((item, index) => {
    if (index <= spliceIndex) {
      return item;
    } else {
      item.offset += readLabel.offset;
      return item;
    }
  });
};

const markPreviousReadForRemoval = (
  previousIndex: number,
  exchanges: DigestedConversationListItem[],
) => {
  if (previousIndex === -1) {
    return exchanges;
  }
  const decrement = exchanges[previousIndex].height;
  exchanges[previousIndex].height = 0;
  return exchanges.map((item, index) => {
    if (index <= previousIndex) {
      return item;
    } else {
      item.offset += decrement;
      return item;
    }
  });
};
