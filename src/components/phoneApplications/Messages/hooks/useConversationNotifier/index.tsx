import { useAppEventsContext } from "@Components/appEvents/context";
import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
} from "@Components/appEvents/reducer/types";
import { produce } from "immer";
import { useMemo, useEffect, useCallback, useState } from "react";
import { delayFor } from "src/utility/async";

import { MESSAGE_CONTACT_INFO, MESSAGE_CONTACT_NAME } from "../../constants";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { findAvailableRoutes } from "../routes/available";
import {
  messageAppConditionsMet,
  removeMessagesThatConditionsHaveNotBeenMet,
} from "../routes/conditionals";
import { isChoosableRoute } from "../routes/guards";
import { ROUTE_TYPE, RouteConditionsType } from "../routes/types";
import { convertBlockToMessagePayloadType } from "../useConversation/digestion/digestRoute";
import { convertMessageToString } from "../useConversations/determineLogLine";
import {
  ConversationFileType,
  ExchangeBlockType,
} from "../useConversations/types";

export const useConversationNotifier = (
  conversations: ConversationFileType[],
  activeConversations: MESSAGE_CONTACT_NAME[]
) => {
  const eventsContext = useAppEventsContext();
  const { state: events, dispatch } = eventsContext;
  const [routes, setRoutes] = useState(
    convertConversationsRoutes(conversations, events)
  );

  const [queue, setQueue] = useState<GenericRouteType>();

  const dispatchNotification = useCallback(
    (route: GenericRouteType) => {
      const conditionalPayloads = removeMessagesThatConditionsHaveNotBeenMet(
        events,
        convertBlockToMessagePayloadType(route.exchanges)
      );
      const message = convertMessageToString(
        conditionalPayloads.slice(-1)[0].messageContent
      );
      const notification = {
        ID: `${route.name}-${route.id}`,
        title: `Message from ${route.name}`,
        content: message,
        image: MESSAGE_CONTACT_INFO[route.name].avatar,
        onPress: () =>
          ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.SHOW, {
            name: route.name,
          }),
      };
      dispatch({
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
          name: route.name,
          routeId: route.id.toString(),
          messageTimestamps: new Array(conditionalPayloads.length).fill(
            new Date().toISOString()
          ),
          logline: message,
          finished: !activeConversations.includes(route.name),
          notification: activeConversations.includes(route.name)
            ? undefined
            : notification,
        },
      });
    },
    [activeConversations, dispatch, events]
  );

  const toNotify = useMemo(() => {
    return Object.values(routes).filter((route) =>
      messageAppConditionsMet(events.Messages, route.conditions)
    );
  }, [events.Messages, routes]);

  const dispatchChoosable = useCallback(
    (route: GenericRouteType) => {
      dispatch({
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
          name: route.name,
          routeId: route.id.toString(),
        },
      });
    },
    [dispatch]
  );

  const notify = useCallback(
    (route: GenericRouteType) => {
      if (route.type === ROUTE_TYPE.CHOOSE) {
        dispatchChoosable(route);
        return;
      }
      dispatchNotification(route);
    },
    [dispatchChoosable, dispatchNotification]
  );

  useEffect(() => {
    const sendToQueue = async () => {
      await Promise.all(
        toNotify.map(async (route) => {
          await delayFor(route.delay || 0);
          return setQueue(route);
        })
      );
    };
    setRoutes(
      produce((draft) => {
        toNotify.forEach((route) => delete draft[`${route.name}-${route.id}`]);
        return draft;
      })
    );
    sendToQueue();
  }, [toNotify]);

  useEffect(() => {
    if (queue) {
      notify(queue);
      setQueue(undefined);
    }
  }, [queue, notify]);
  return [] as const;
};

type GenericRouteType = {
  name: MESSAGE_CONTACT_NAME;
  id: string;
  type: ROUTE_TYPE;
  conditions?: RouteConditionsType | RouteConditionsType[];
  delay?: number;
  exchanges: ExchangeBlockType[];
};
type GenericRoutesType = {
  [id: string]: GenericRouteType;
};

const convertConversationsRoutes = (
  conversations: ConversationFileType[],
  events: AppEventsType
) => {
  return conversations.reduce((ret, conversation) => {
    const routes = [
      ...conversation.routes,
      ...(conversation.notificationRoutes || []),
    ];
    const convertedRoutes = findAvailableRoutes(
      conversation.name,
      routes,
      events
    );
    convertedRoutes.reduce((ret, route) => {
      const routeID = `${conversation.name}-${route.id.toString()}`;
      ret[routeID] = {
        delay: route.delay,
        name: conversation.name,
        id: route.id.toString(),
        type: isChoosableRoute(route)
          ? ROUTE_TYPE.CHOOSE
          : ROUTE_TYPE.NOTIFICATION,
        conditions: route.conditions,
        exchanges: isChoosableRoute(route) ? [] : route.exchanges,
      };
      return ret;
    }, ret);
    return ret;
  }, {} as GenericRoutesType);
};
