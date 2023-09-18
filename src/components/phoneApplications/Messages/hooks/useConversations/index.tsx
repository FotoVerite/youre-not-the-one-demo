import { useAppEventsContext } from "@Components/appEvents/context";
import { AppEventsType } from "@Components/appEvents/reducer/types";
import { produce } from "immer";
import { useEffect, useMemo, useState } from "react";

import {
  ConversationFileType,
  ConversationListType,
  ConversationRecords,
} from "./types";
import { spam1 } from "../../assets/messages/spam1";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import {
  findAvailableRoutes,
  messageAppConditionsMet,
} from "../routes/available";
import { determineLoglineAndTimeOfLastMessage } from "./determineLogLine";
import { greg } from "../../assets/messages/greg";

const _conversations: ConversationFileType[] = [spam1, greg];

const viewableConversationsFilter =
  (events: AppEventsType) => (conversation: ConversationFileType) =>
    !conversation.blocked &&
    (!conversation.conditions ||
      messageAppConditionsMet(events.Messages, conversation.conditions));

const conversationHasExchange = (
  conversation: ConversationFileType,
  events: AppEventsType
) =>
  conversation.exchanges.length > 0 ||
  Object.keys(events.Messages[conversation.name].routes).length > 0;

export const sortConversations =
  () => (c1: ConversationListType, c2: ConversationListType) => {
    const date1 = c1.logline_timestamp;
    const date2 = c2.logline_timestamp;
    if (date1 < date2) {
      return 1;
    }
    if (date1 > date2) {
      return -1;
    }
    return 0;
  };

const convertFromConversationFromFileToListType = (
  conversation: ConversationFileType,
  events: AppEventsType
): ConversationListType => {
  const {
    blockable,
    blocked,
    conditions,
    notificationRoutes,
    exchanges,
    group,
    routes,
    ...props
  } = conversation;
  const hasAvailableRoute =
    findAvailableRoutes(props.name, routes || [], events).length > 0;
  const { time, content } = determineLoglineAndTimeOfLastMessage(
    conversation,
    events
  );

  return {
    ...props,
    ...{
      hasAvailableRoute,
      logline_content: content,
      logline_timestamp: time,
    },
  };
};

export const useConversations = (override?: ConversationFileType[]) => {
  const eventsContext = useAppEventsContext();
  const events = eventsContext.state;
  const [conversations, setConversations] = useState(
    override || _conversations
  );
  const viewableConversations = useMemo(() => {
    return produce(conversations, (draft) => {
      return draft.filter(viewableConversationsFilter(events));
    });
  }, [conversations, events]);

  const displayedConversations = useMemo(() => {
    const _conversations = viewableConversations
      .filter((c) => conversationHasExchange(c, events))
      .map((c) => convertFromConversationFromFileToListType(c, events));
    return _conversations.sort(sortConversations());
  }, [viewableConversations, events]);

  const determinedBlockedConversations = useMemo(() => {
    return Object.entries(events.Messages)
      .filter((contact) => contact[1].blocked)
      .map((contact) => contact[0] as MESSAGE_CONTACT_NAME);
  }, [conversations, events]);

  useEffect(() => {
    if (determinedBlockedConversations.length > 0) {
      setConversations(
        produce(conversations, (draft) => {
          determinedBlockedConversations.forEach((name) => {
            const index = draft.findIndex(
              (_conversation) => _conversation.name === name
            );
            draft[index].blocked = true;
          });
          return draft;
        })
      );
    }
  }, [determinedBlockedConversations]);

  const conversationsRecords: ConversationRecords = useMemo(() => {
    return viewableConversations.reduce((result, conversation) => {
      return { ...result, [conversation.name]: conversation };
    }, {} as ConversationRecords);
  }, [viewableConversations]);

  return [displayedConversations, conversationsRecords] as const;
};
