import { PropsWithChildren, ReactNode } from "react";

import { MESSAGE_CONTACT_NAME } from "../../constants";
import { MessagePayloadType } from "../../hooks/useConversation/digestion/types";

export type MessageLogsType = Record<
  MESSAGE_CONTACT_NAME,
  MessagePayloadType[]
>;

export type MessageLogsContextProvider = {
  children: ReactNode;
};

export type MessageLogsContextDigestedType = PropsWithChildren<{
  messageLog: MessageLogsType;
}>;
