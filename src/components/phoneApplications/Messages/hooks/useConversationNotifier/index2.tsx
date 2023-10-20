import { useAppEventsContext } from "@Components/appEvents/context";
import { hasLogline } from "@Components/appEvents/reducer/guards";
import {
  MessageAppEventsContainerType,
  MessageRouteEventDataType,
} from "@Components/appEvents/reducer/types";
import { useNotificationContext } from "@Components/notifications/context";
import {
  NOTIFICATIONS_REDUCER_ACTIONS,
  NOTIFICATION_ON_PRESS,
} from "@Components/notifications/reducer/types";
import { useMemo, useEffect, useState } from "react";

import { MESSAGE_CONTACT_INFO, MESSAGE_CONTACT_NAME } from "../../constants";
import { filterRouteEventsByStatus } from "../routes/filter";
import { ROUTE_STATUS_TYPE } from "../routes/types";
import { ConversationFileType } from "../useConversations/types";

type CacheType = {
  [index: string]: MessageRouteEventDataType & {
    name: MESSAGE_CONTACT_NAME;
    logline: string;
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
      ROUTE_STATUS_TYPE.STARTED
    )
      .filter(([, route]) => route.logline != null)
      .filter(([id]) => cache[`${id}-${name}`] != null);
    routes.reduce((acc, [id, route]) => {
      if (hasLogline(route)) {
        acc[`${id}-${name}`] = { ...route, name };
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
  const { state: events } = useAppEventsContext();
  const { dispatch: notify } = useNotificationContext();
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
    for (const id in toNotify) {
      const event = toNotify[id];
      const notification = {
        ID: id,
        title: `Message from ${event.name}`,
        content: event.logline || "",
        image: MESSAGE_CONTACT_INFO[event.name].avatar,
        onPress: {
          type: NOTIFICATION_ON_PRESS.CONVERSATION,
          payload: { name: event.name },
        },
      };
      if (!activeConversations.includes(event.name)) {
        notify({
          type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
          payload: notification,
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
  }, [activeConversations, notify, toNotify]);
};
