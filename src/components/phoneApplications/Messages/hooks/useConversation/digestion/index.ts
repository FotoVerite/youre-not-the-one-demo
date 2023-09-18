import { AppEventsType } from "@Components/appEvents/reducer/types";

import { appendSeenRoutes, digestExchanges } from "./digestRoute";
import { resolveSnapshots } from "./snapshotResolver";
import {
  DigestedConversationListItem,
  DigestedConversationType,
  BaseConfigType,
} from "./types";
import { digestUnfinishedRoute } from "./unfinishedRoute";
import { findAvailableRoutes } from "../../routes/available";
import { ConversationType } from "../../useConversations/types";

const combineIntoDigestedConversationType = (
  exchanges: DigestedConversationListItem[],
  props: Omit<ConversationType, "exchanges">,
  events: AppEventsType
): DigestedConversationType => {
  const availableRoute = findAvailableRoutes(
    props.name,
    props.routes || [],
    events
  )[0];
  return {
    ...props,
    exchanges,
    availableRoute,
    ...{ activePath: [] },
  };
};

export const digestConversation = async (
  config: BaseConfigType,
  conversation: ConversationType,
  events: AppEventsType
) => {
  const { exchanges, ...conversationProps } = conversation;

  const digestedExchanges = digestExchanges(
    config,
    exchanges,
    conversationProps.group
  );
  const digested = combineIntoDigestedConversationType(
    digestedExchanges,
    conversationProps,
    events
  );

  digested.exchanges = appendSeenRoutes(digested, events, config);
  digestUnfinishedRoute(digested, events, config);
  digested.exchanges = await resolveSnapshots(digested.exchanges);
  return digested;
};
