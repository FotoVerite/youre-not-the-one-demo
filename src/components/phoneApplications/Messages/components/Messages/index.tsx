import { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import ConversationIndexView from "./ConversationIndexView";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { useConversations } from "../../hooks/useConversations";

const Messages: FC = () => {
  const [viewable, available] = useConversations();

  useEffect(() => {
    ConversationEmitter.on(CONVERSATION_EMITTER_EVENTS.SHOW, (name) => {
      const _conversation = viewable.filter((c) => c.name === name)[0];
    });
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.SHOW, () => {});
    };
  }, []);

  return (
    <View style={[styles.layout]}>
      <ConversationIndexView viewable={viewable} />
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
