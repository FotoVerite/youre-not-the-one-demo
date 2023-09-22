import { duration } from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import ConversationIndexView from "./ConversationIndexView";
import ConversationShowView from "./ConversationShowView";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import MediaContextProvider from "../../context/Media";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { useConversationNotifier } from "../../hooks/useConversationNotifier";
import { useConversations } from "../../hooks/useConversations";
import { ConversationType } from "../../hooks/useConversations/types";
import NewMessageView from "./NewMessageView";

const Messages: FC = () => {
  const [viewable, displayed, available] = useConversations();
  const [conversation, setConversation] = useState<ConversationType>();
  const [newMessageConversation, setNewMessageConversation] =
    useState<ConversationType>();

  const activeConversations = useMemo(() => {
    return [conversation?.name, newMessageConversation?.name].filter(
      (n) => n !== null
    ) as MESSAGE_CONTACT_NAME[];
  }, [conversation, newMessageConversation]);

  useConversationNotifier(viewable, activeConversations);

  useEffect(() => {
    ConversationEmitter.on(
      CONVERSATION_EMITTER_EVENTS.SHOW,
      ({ name, type }) => {
        const _conversation = available[name];

        if (!type) {
          setConversation(_conversation);
        } else {
          setNewMessageConversation(_conversation);
        }
      }
    );
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.SHOW, () => {});
    };
  }, [available]);

  useEffect(() => {
    ConversationEmitter.on(
      CONVERSATION_EMITTER_EVENTS.RESET,
      ({ name, type }) => {
        if (!type) {
          setConversation(undefined);
        } else {
          setNewMessageConversation(undefined);
        }
      }
    );
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.RESET, () => {});
    };
  }, []);

  const newMessageShowing = useSharedValue(0);

  useEffect(() => {
    newMessageShowing.value = withTiming(newMessageConversation ? 1 : 0, {
      duration: 750,
    });
  }, [newMessageConversation, newMessageShowing]);

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
