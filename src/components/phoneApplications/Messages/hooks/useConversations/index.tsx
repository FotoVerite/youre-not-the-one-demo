import { useAppEventsContext } from "@Components/appEvents/context";
import { AppEventsType } from "@Components/appEvents/reducer/types";
import { produce } from "immer";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

import {
  determineLoglineAndTimeOfLastMessage,
  formatConversationTime,
} from "./determineLogLine";
import {
  ConversationFileType,
  ConversationListType,
  ConversationRecords,
} from "./types";
import { cat_facts } from "../../assets/messages/cat_facts";
import { lenny } from "../../assets/messages/lenny";
import { michael } from "../../assets/messages/michael";
import { spam1 } from "../../assets/messages/spam1";
import { toSelf } from "../../assets/messages/toSelf";
import { zara } from "../../assets/messages/zara";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import { hasStartableRoute } from "../routes/available";
import { messageAppConditionsMet } from "../routes/conditionals";

const _conversations: ConversationFileType[] = [
  toSelf,
  cat_facts,
  zara,
  spam1,
  michael,
  lenny,
];

const viewableConversationsFilter =
  (events: AppEventsType) => (conversation: ConversationFileType) =>
    !conversation.blocked &&
    (!conversation.conditions ||
      messageAppConditionsMet(events.Messages, conversation.conditions));

const conversationHasExchange = (
  conversation: ConversationFileType,
  events: AppEventsType
) => {
  const routes = events.Messages[conversation.name].routes;
  const hasViewableRoute = Object.values(routes).filter((r) => r.logline);
  return conversation.exchanges.length > 0 || hasViewableRoute.length > 0;
};

export const sortConversations =
  () => (c1: ConversationListType, c2: ConversationListType) => {
    const date1 = moment(c1.logline_timestamp);
    const date2 = moment(c2.logline_timestamp);
    return date1 < date2 ? 1 : -1;
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
  const hasAvailableRoute = hasStartableRoute(props.name, routes || [], events);
  const { time, logline } = determineLoglineAndTimeOfLastMessage(
    conversation,
    events
  );
  return {
    ...props,
    ...{
      hasAvailableRoute,
      logline_content: logline,
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
  }, [events]);

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
  }, [conversations, determinedBlockedConversations]);

  const conversationsRecords: ConversationRecords = useMemo(() => {
    return viewableConversations.reduce((result, conversation) => {
      return { ...result, [conversation.name]: conversation };
    }, {} as ConversationRecords);
  }, [viewableConversations]);
  return [
    viewableConversations,
    displayedConversations,
    conversationsRecords,
  ] as const;
};
