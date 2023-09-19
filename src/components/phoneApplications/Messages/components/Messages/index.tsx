import { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ConversationIndexView from "./ConversationIndexView";
import ConversationShowView from "./ConversationShowView";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { useConversations } from "../../hooks/useConversations";
import { ConversationType } from "../../hooks/useConversations/types";
import MediaContextProvider from "../../context/Media";

const Messages: FC = () => {
  const [viewable, available] = useConversations();
  const [conversation, setConversation] = useState<ConversationType>();

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
      <ConversationIndexView viewable={viewable} />
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
