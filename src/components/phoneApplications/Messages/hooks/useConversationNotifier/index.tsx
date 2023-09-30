import { useAppEventsContext } from "@Components/appEvents/context";
import { APP_EVENTS_ACTIONS } from "@Components/appEvents/reducer/types";
import { useRef, useMemo, useEffect, useCallback, useState } from "react";
import { delayFor } from "src/utility/async";

import { MESSAGE_CONTACT_INFO, MESSAGE_CONTACT_NAME } from "../../constants";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { findAvailableRoutes } from "../routes/available";
import { NotificationRouteType } from "../routes/types";
import {
  convertMessageToString,
  getLastMessageFromExchanges,
} from "../useConversations/determineLogLine";
import { ConversationFileType } from "../useConversations/types";
import { createSHA1ID } from "src/utility/crypto";
import { useStorageContext } from "src/contexts/storage";

type NotificationRecord = Record<string, boolean>;

export const useConversationNotifier = (
  conversations: ConversationFileType[],
  activeConversations: MESSAGE_CONTACT_NAME[]
) => {
  const eventsContext = useAppEventsContext();
  const { state: events, dispatch } = eventsContext;
  const prevConversations = useRef<NotificationRecord>({});
  const [notificationQueue, setNotificationQueue] = useState<
    { name: MESSAGE_CONTACT_NAME; route: NotificationRouteType }[]
  >([]);
  const storage = useStorageContext();

  useEffect(() => {
    prevConversations.current = storage.events
      ? storage.events.NOTIFICATIONS.reduce((acc, n) => {
          acc[n.ID] = true;
          return acc;
        }, {} as NotificationRecord)
      : {};
    prevConversations.current["resolved"] = true;
  }, [storage.events]);

  const toNotify = useMemo(() => {
    if (prevConversations.current["resolved"] == null) return [];
    return conversations
      .filter(
        (conversation) =>
          conversation.notificationRoutes &&
          conversation.notificationRoutes.length > 0
      )
      .reduce(
        (acc, conversation) => {
          const name = conversation.name;
          const routes = findAvailableRoutes(
            conversation.name,
            conversation.notificationRoutes || [],
            events
          );
          routes.forEach((route) => {
            const ID = `${name}-${route.id}`;
            if (prevConversations.current[ID] == null) {
              acc.push({ route, name });
              prevConversations.current[ID] = true;
            }
          });
          return acc;
        },
        [] as { name: MESSAGE_CONTACT_NAME; route: NotificationRouteType }[]
      );
  }, [conversations, events]);

  const notify = useCallback(
    async (name: MESSAGE_CONTACT_NAME, route: NotificationRouteType) => {
      const message = convertMessageToString(
        getLastMessageFromExchanges(route.exchanges)
      );
      const notification = {
        ID: `${name}-${route.id}`,
        title: `Message from ${name}`,
        content: message,
        image: MESSAGE_CONTACT_INFO[name].avatar,
        onPress: () =>
          ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.SHOW, {
            name,
          }),
      };
      dispatch({
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
          name,
          routeId: route.id,
          finished: true,
          notification: activeConversations.includes(name)
            ? undefined
            : notification,
        },
      });
    },
    [activeConversations, dispatch]
  );

  useEffect(() => {
    const sendToQueue = async () => {
      const notifications = await Promise.all(
        toNotify.map(async (notification) => {
          await delayFor(notification.route.delay || 0);
          return notification;
        })
      );
      setNotificationQueue(notifications);
    };
    sendToQueue();
  }, [toNotify]);

  useEffect(() => {
    notificationQueue.forEach((notification) => {
      notify(notification.name, notification.route);
    });
  }, [notificationQueue, notify]);
  return [] as const;
};
