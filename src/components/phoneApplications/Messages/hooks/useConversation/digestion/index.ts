import { AppEventsType } from "@Components/appEvents/reducer/types";

import { blockableConditionsMet } from "./blockable";
import {
  appendFromDigestedRoute,
  appendSeenRoutes,
  convertRoutesToDigestedRoutes,
  digestExchanges,
} from "./digestRoute";
import { appendReadLabel } from "./readLabel";
import { resolveSnapshots } from "./snapshotResolver";
import { BaseConfigType } from "./types";
import { findStartableRoute } from "../../routes/available";
import { removeMessagesThatConditionsHaveNotBeenMet } from "../../routes/conditionals";
import { isActiveChoosableRoute, isStarted } from "../../routes/guards";
import { ConversationType } from "../../useConversations/types";

export const digestConversation = async (
  config: BaseConfigType,
  conversation: ConversationType,
  events: AppEventsType
) => {
  const [available, seen, startedRoute] = convertRoutesToDigestedRoutes(
    conversation,
    events.Messages
  );
  if (startedRoute) {
    startedRoute.pending = removeMessagesThatConditionsHaveNotBeenMet(
      events,
      startedRoute.pending
    );
  }
  const { exchanges, ...conversationProps } = conversation;
  const activeRoute =
    startedRoute ||
    (await findStartableRoute(
      config.width,
      conversation.name,
      Object.entries(available).map(([id, route]) => route),
      events
    ));
  const digestedExchanges = digestExchanges(
    config,
    exchanges,
    conversationProps.group
  );

  const digested = {
    ...conversationProps,
    ...{
      exchanges: digestedExchanges,
      availableRoutes: available,
      activeRoute,
    },
  };
  digested.blockable = blockableConditionsMet(digested, events);
  digested.exchanges = appendSeenRoutes(digested, seen, config);
  if (isStarted(digested.activeRoute)) {
    digested.exchanges = appendFromDigestedRoute(
      digested.exchanges,
      digested.activeRoute,
      digested.group,
      config
    );
  }

  digested.exchanges = await resolveSnapshots(digested.exchanges);
  digested.exchanges = appendReadLabel(
    digested.exchanges,
    config.width,
    digested.exchanges.slice(-1)[0].timestamp,
    digested.leaveAsDelivered
  );
  return digested;
};
