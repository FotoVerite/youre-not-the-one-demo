import { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";

import ConversationIndexView from "./ConversationIndexView";
import ConversationShowView from "./ConversationShowView";
import NewMessageView from "./NewMessageView";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import MediaContextProvider from "../../context/Media";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { useConversationNotifier } from "../../hooks/useConversationNotifier";
import { useConversations } from "../../hooks/useConversations";
import { ConversationType } from "../../hooks/useConversations/types";

const Messages: FC = () => {
  const [viewable, displayed, available] = useConversations();
  const [conversation, setConversation] = useState<ConversationType>();
  const [newMessageConversation, setNewMessageConversation] =
    useState<ConversationType>();
  const [indexCovered, setIndexCovered] = useState(false);
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

  const shrink = useSharedValue(0);
  const conversationShown = useSharedValue(0);

  useAnimatedReaction(
    () => {
      return shrink.value === 1 || conversationShown.value === 1;
    },
    (result, previous) => {
      if (result !== previous) {
        runOnJS(setIndexCovered)(result);
      }
    },
    []
  );

  return (
    <View style={[styles.layout]}>
      <ConversationIndexView
        viewable={displayed}
        shrink={shrink}
        conversationShown={conversationShown}
      />
      <MediaContextProvider>
        <ConversationShowView
          conversation={conversation}
          shrink={shrink}
          conversationShown={conversationShown}
        />
        <NewMessageView conversation={newMessageConversation} shrink={shrink} />
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
