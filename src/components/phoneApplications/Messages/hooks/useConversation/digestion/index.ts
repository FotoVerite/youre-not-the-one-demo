import { AppEventsType } from "@Components/appEvents/reducer/types";

import { blockableConditionsMet } from "./blockable";
import { appendSeenRoutes, digestExchanges } from "./digestRoute";
import { appendReadLabel, lastRouteTime } from "./readLabel";
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
  events: AppEventsType,
): DigestedConversationType => {
  const availableRoute = findAvailableRoutes(
    props.name,
    props.routes.map((route) => ({ ...route, ...{ name: props.name } })) || [],
    events,
  )[0];

  return {
    ...props,
    exchanges,
    availableRoute,
    seenRoutes: [],
    ...{ activePath: [] },
  };
};

export const digestConversation = async (
  config: BaseConfigType,
  conversation: ConversationType,
  events: AppEventsType,
) => {
  const { exchanges, ...conversationProps } = conversation;

  const digestedExchanges = digestExchanges(
    config,
    exchanges,
    conversationProps.group,
  );
  const digested = combineIntoDigestedConversationType(
    digestedExchanges,
    conversationProps,
    events,
  );
  digested.blockable = blockableConditionsMet(digested, events);
  digested.exchanges = appendSeenRoutes(digested, events, config);
  digestUnfinishedRoute(digested, events, config);
  digested.exchanges = await resolveSnapshots(digested.exchanges);
  digested.exchanges = appendReadLabel(
    digested.exchanges,
    config.width,
    lastRouteTime(digested, events),
    digested.leaveAsDelivered,
  );
  return digested;
};
