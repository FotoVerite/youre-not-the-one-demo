import { useEffect } from "react";

import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import {
  ConversationRecords,
  ConversationType,
} from "../useConversations/types";

export const useConversationObserver = (
  conversationEvent: CONVERSATION_EMITTER_EVENTS,
  conversations: ConversationRecords,
  digestConversation: (conversation: ConversationType) => void,
  dispatch: () => void,
) => {
  useEffect(() => {
    ConversationEmitter.on(conversationEvent, (name) => {
      digestConversation(conversations[name]);
    });
    return () => {
      ConversationEmitter.off(conversationEvent, () => {});
    };
  }, [conversations, digestConversation]);
};
