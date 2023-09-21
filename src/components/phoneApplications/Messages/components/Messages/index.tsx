import { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import ConversationIndexView from "./ConversationIndexView";
import ConversationShowView from "./ConversationShowView";
import MediaContextProvider from "../../context/Media";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { useConversations } from "../../hooks/useConversations";
import { ConversationType } from "../../hooks/useConversations/types";
import { useConversationNotifier } from "../../hooks/useConversationNotifier";

const Messages: FC = () => {
  const [viewable, displayed, available] = useConversations();
  const [conversation, setConversation] = useState<ConversationType>();

  const activeConversations = useMemo(
    () => (conversation?.name ? [conversation.name] : []),
    [conversation]
  );
  useConversationNotifier(viewable, activeConversations);

  useEffect(() => {
    ConversationEmitter.on(
      CONVERSATION_EMITTER_EVENTS.SHOW,
      ({ name, type }) => {
        if (!type) {
          const _conversation = available[name];
          setConversation(_conversation);
        }
      }
    );
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.SHOW, () => {});
    };
  }, []);

  useEffect(() => {
    ConversationEmitter.on(
      CONVERSATION_EMITTER_EVENTS.RESET,
      ({ name, type }) => {
        if (!type) {
          setConversation(undefined);
        }
      }
    );
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.RESET, () => {});
    };
  }, []);

  return (
    <View style={[styles.layout]}>
      <ConversationIndexView viewable={displayed} />
      <MediaContextProvider>
        <ConversationShowView conversation={conversation} />
      </MediaContextProvider>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: "#f1f1f1",
  },
});
