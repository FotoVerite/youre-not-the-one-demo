import {
  DigestedConversationType,
  BubbleItemType,
  isSentMessage,
  DigestedConversationListItem,
  isReceivedMessage,
} from "../digestion/types";

const DEFAULT_CONTENT_DELAY = 400;
export const resetMessageDelays = (draft: DigestedConversationType) => {
  draft.exchanges = draft.exchanges.map((e) => {
    return {
      ...e,
      contentDelay: undefined,
      typingDelay: undefined,
    };
  });
};

export const revertPreviousMessageEphemeralProps = (
  draft: DigestedConversationType
) => {
  const previous = draft.previousExchangeProps;
  if (!previous) return;
  const index = draft.exchanges.findIndex((e) => e.ID === previous.ID);
  draft.exchanges[index] = {
    ...draft.exchanges[index],
    ...previous,
  } as DigestedConversationListItem;
};

export const setMessageEphemeralProps = (
  draft: DigestedConversationType,
  message: BubbleItemType
) => {
  message.contentDelay = message.contentDelay || DEFAULT_CONTENT_DELAY;

  draft.previousExchangeProps = {
    contentDelay: undefined,
    typingDelay: undefined,
    ID: message.ID,
    isLastInExchange: message.isLastInExchange,
  };
  if (isSentMessage(message)) {
    message.isLastInExchange = true;
    draft.receivingMessage = true;
  }
  if (isReceivedMessage(message)) draft.receivingMessage = true;
};
