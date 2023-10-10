import { AppEventsType } from "@Components/appEvents/reducer/types";

import { blockableConditionsMet } from "./blockable";
import {
  appendFromDigestedRoute,
  appendSeenRoutes,
  convertRoutesToDigestedRoutes,
  digestExchanges,
} from "./digestRoute";
import { appendReadLabel } from "./readLabel";
import { BaseConfigType } from "./types";
import { findStartableRoute } from "../../routes/available";
import { isStarted } from "../../routes/guards";
import { resolveRoutePath } from "../../routes/resolver";
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
    startedRoute.pending = await resolveRoutePath(
      config.width,
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
  digested.exchanges = await appendSeenRoutes(digested, seen, config);
  if (isStarted(digested.activeRoute)) {
    digested.exchanges = await appendFromDigestedRoute(
      digested.exchanges,
      digested.activeRoute,
      digested.group,
      config
    );
  }

  //digested.exchanges = await resolveSnapshots(digested.exchanges);
  digested.exchanges = appendReadLabel(
    digested.exchanges,
    config.width,
    digested.exchanges.slice(-1)[0].timestamp,
    digested.leaveAsDelivered
  );
  return digested;
};
