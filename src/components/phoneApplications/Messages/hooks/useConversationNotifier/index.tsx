import { useAppEventsContext } from "@Components/appEvents/context";
import { APP_EVENTS_ACTIONS } from "@Components/appEvents/reducer/types";
import { useRef, useMemo, useEffect } from "react";
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

type NotificationRecord = Record<
  string,
  { name: MESSAGE_CONTACT_NAME; route: NotificationRouteType }
>;

export const useConversationNotifier = (
  conversations: ConversationFileType[],
  activeConversations: MESSAGE_CONTACT_NAME[]
) => {
  const eventsContext = useAppEventsContext();
  const { state: events, dispatch } = eventsContext;
  const prevConversations = useRef<NotificationRecord>({});

  const toNotify = useMemo(() => {
    return conversations
      .filter(
        (conversation) =>
          (conversation.notificationRoutes &&
            conversation.notificationRoutes.length > 0) ||
          activeConversations.includes(conversation.name)
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
              prevConversations.current[ID] = { route, name };
            }
          });
          return acc;
        },
        [] as { name: MESSAGE_CONTACT_NAME; route: NotificationRouteType }[]
      );
  }, [activeConversations, conversations, events]);

  useEffect(() => {
    const notify = async (
      name: MESSAGE_CONTACT_NAME,
      route: NotificationRouteType
    ) => {
      await delayFor(route.delay || 0);
      const message = convertMessageToString(
        getLastMessageFromExchanges(route.exchanges)
      );
      dispatch({
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
          name,
          routeId: route.id,
          notification: {
            title: `Message from ${name}`,
            content: message,
            image: MESSAGE_CONTACT_INFO[name].avatar,
            onPress: () =>
              ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.SHOW, {
                name,
              }),
          },
        },
      });
    };

    toNotify.forEach((notification) => {
      notify(notification.name, notification.route);
    });
  }, [dispatch, toNotify]);
  return [] as const;
};
