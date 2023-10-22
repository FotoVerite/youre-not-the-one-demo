import { useAppEventsContext } from "@Components/appEvents/context";
import { hasLogline } from "@Components/appEvents/reducer/guards";
import {
  APP_EVENTS_ACTIONS,
  MessageAppEventsContainerType,
  MessageRouteEventDataType,
} from "@Components/appEvents/reducer/types";
import { useMemo, useEffect, useState } from "react";

import { MESSAGE_CONTACT_NAME } from "../../constants";
import { filterRouteEventsByStatus } from "../routes/filter";
import { ROUTE_STATUS_TYPE, ROUTE_TYPE } from "../routes/types";
import { ConversationFileType } from "../useConversations/types";

type CacheType = {
  [index: string]: MessageRouteEventDataType & {
    name: MESSAGE_CONTACT_NAME;
    logline: string;
    id: string;
  };
};

const filterRoutesThatNeedNotification = (
  names: MESSAGE_CONTACT_NAME[],
  messageEvents: MessageAppEventsContainerType,
  cache: CacheType
) => {
  return names.reduce((acc, name) => {
    const routes = filterRouteEventsByStatus(
      messageEvents[name],
      ROUTE_STATUS_TYPE.AVAILABLE
    )
      .filter(([, route]) => route.type === ROUTE_TYPE.NOTIFICATION)
      .filter(([id]) => cache[`${id}-${name}`] == null);
    routes.reduce((acc, [id, route]) => {
      if (hasLogline(route)) {
        acc[`${id}-${name}`] = { ...route, name, id };
      }
      return acc;
    }, acc);
    return acc;
  }, {} as CacheType);
};

export const useConversationNotifier = (
  conversations: ConversationFileType[],
  activeConversations: MESSAGE_CONTACT_NAME[]
) => {
  const { state: events, dispatch } = useAppEventsContext();
  const [cache, setCache] = useState<CacheType>(
    filterRoutesThatNeedNotification(
      conversations.map((conversation) => conversation.name),
      events.Messages,
      {}
    )
  );
  const messageEvents = events.Messages;

  const toNotify = useMemo(() => {
    const names = conversations.map((conversation) => conversation.name);
    return filterRoutesThatNeedNotification(names, messageEvents, cache);
  }, [cache, conversations, messageEvents]);

  useEffect(() => {
    if (Object.values(toNotify).length === 0) return;
    for (const id in toNotify) {
      const event = toNotify[id];
      if (!activeConversations.includes(event.name)) {
        dispatch({
          type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
          payload: {
            routeId: event.id,
            name: event.name,
            status: ROUTE_STATUS_TYPE.FINISHED,
            notify: true,
          },
        });
      }
    }
    const additions = Object.keys(toNotify).reduce((acc, id) => {
      acc[id] = toNotify[id];
      return acc;
    }, {} as CacheType);
    setCache((cache) => {
      return { ...cache, ...additions };
    });
  }, [activeConversations, dispatch, toNotify]);
};
