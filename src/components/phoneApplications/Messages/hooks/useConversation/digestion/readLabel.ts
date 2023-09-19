import { AppEventsType } from "@Components/appEvents/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { createReadLabel } from "./SkFunctions/createReadLabel";
import {
  DigestedConversationListItem,
  DigestedConversationType,
  isDigestedLabel,
} from "./types";
import { MESSAGE_CONTENT } from "../../contentWithMetaTypes";
import { getSeenRoutes, getUnfinishedRouteID } from "../../routes/seen";

export const lastRouteTime = (
  digested: DigestedConversationType,
  events: AppEventsType
) => {
  const unfinishedID = getUnfinishedRouteID(
    digested.name,
    events,
    digested.routes || []
  );
  if (unfinishedID) {
    return events.Messages[digested.name].routes[
      unfinishedID
    ].createdAt.toISOString();
  }
  const seenRoutes = getSeenRoutes(
    digested.name,
    events,
    digested.routes,
    digested.notificationRoutes
  );
  return seenRoutes[0] ? seenRoutes[0].createdAt.toISOString() : undefined;
};

export const appendReadLabel = (
  exchanges: DigestedConversationListItem[],
  width: number,
  readTime?: string
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
    readTime ? readTime : new Date().toISOString(),
    width,
    exchanges[spliceIndex - 1].offset
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
  exchanges: DigestedConversationListItem[]
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
