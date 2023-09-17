import moment from "moment";
import { formatTimeStamp } from "src/utility/datetime";

import { MESSAGE_CONTENT } from "../../../contentWithMetaTypes";
import { ConversationExchangeType } from "../../../useConversations/types";
import { DigestedConversationTimeType } from "../types";

const HEIGHT = 30;

export const createTimeStampLabel = (
  time: string,
  width: number,
  offset: number
): DigestedConversationTimeType => {
  const listItem = {
    ID: crypto.randomUUID(),
    height: HEIGHT,
    width,
    paddingBottom: 0,
    offset,
    content: formatTimeStamp(moment(time)),
    type: MESSAGE_CONTENT.TIME,
  } as DigestedConversationTimeType;
  return listItem;
};
