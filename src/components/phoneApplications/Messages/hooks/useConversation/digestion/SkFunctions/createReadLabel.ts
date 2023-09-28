import * as Crypto from "expo-crypto";
import moment from "moment";
import { formatTimeStamp } from "src/utility/datetime";

import { MESSAGE_CONTENT } from "../../../contentWithMetaTypes";
import { DigestedConversationReadLabelType } from "../types";

const HEIGHT = 30;

export const createReadLabel = (
  time: string,
  width: number,
  offset: number,
  leaveAsDelivered?: boolean,
  contentDelay?: number
): DigestedConversationReadLabelType => {
  const listItem = {
    ID: Crypto.randomUUID(),
    contentDelay,
    height: HEIGHT,
    width,
    paddingBottom: 0,
    offset,
    content: leaveAsDelivered
      ? "delivered"
      : `read ${formatTimeStamp(moment(time))}`,
    type: MESSAGE_CONTENT.READ_LABEL,
  } as DigestedConversationReadLabelType;
  return listItem;
};
