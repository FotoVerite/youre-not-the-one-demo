import { AppEventsType } from "@Components/appEvents/reducer/types";

import { StorageType } from "src/contexts/asyncStorage/types";
import {
  appendExchanges,
  appendSeenRoutes,
  appendFromDigestedRoute,
} from "./append";
import { blockableConditionsMet } from "./blockable";
import { appendReadLabel } from "./readLabel";
import { reduceAndSortRoutes } from "./routeReducers";
import { BaseConfigType } from "./types";
import { resolveRoutePath } from "../../routes/resolver";
import { ConversationType } from "../../useConversations/types";

export const digestConversation = (
  config: BaseConfigType,
  conversation: ConversationType,
  events: AppEventsType,
  cache: StorageType
) => {
  const [untriggered, seen, startedRoute] = reduceAndSortRoutes(
    conversation,
    events.Messages,
    cache
  );

  const { exchanges, ...conversationProps } = conversation;

  const digested = {
    ...conversationProps,
    ...{
      exchanges: appendExchanges(exchanges, {
        ...config,
        ...{ group: conversationProps.group || false, offset: 50 },
      }),
      availableRoutes: untriggered,
    },
  };
  digested.blockable = blockableConditionsMet(digested, events);
  digested.exchanges = appendSeenRoutes(digested, seen, config);

  if (startedRoute) {
    startedRoute.pending = resolveRoutePath(
      events,
      cache,
      startedRoute.pending
    );
    digested.exchanges = appendFromDigestedRoute(
      digested.exchanges,
      startedRoute,
      digested.group,
      config
    );
  }
  digested.exchanges = appendReadLabel(
    digested.exchanges,
    config.width,
    digested.exchanges.slice(-1)[0].timestamp,
    digested.leaveAsDelivered
  );
  return digested;
};
