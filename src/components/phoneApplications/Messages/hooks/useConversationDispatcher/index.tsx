import { useAppEventsContext } from "@Components/appEvents/context";
import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
} from "@Components/appEvents/reducer/types";
import { produce } from "immer";
import { useState, useCallback, useMemo, useEffect } from "react";
import { delayFor } from "src/utility/async";

import {
  messageAppConditionsMet,
  repeatableTimePassed,
} from "../routes/conditionals";
import {
  isDigestedChoosableRoute,
  isDigestedNotificationRoute,
  isNotificationRoute,
} from "../routes/guards";
import {
  ROUTE_STATUS_TYPE,
  AbstractDigestedRouteType,
  DigestedNotificationRouteType,
  ROUTE_TYPE,
} from "../routes/types";
import { createRouteKey } from "../routes/utility";
import { reduceAndSortRoutes } from "../useConversation/digestion/routeReducers";
import { convertMessageToString } from "../useConversations/determineLogLine";
import { ConversationFileType } from "../useConversations/types";

export const useConversationDispatcher = (
  conversations: ConversationFileType[]
) => {
  const eventsContext = useAppEventsContext();
  const { state: events, dispatch } = eventsContext;
  const [cachedConversations, setCachedConversations] = useState(() =>
    conversations.map((c) => c.name)
  );
  const [routes, setRoutes] = useState(() =>
    reduceConversations(conversations, events)
  );

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const newConversations = conversations.filter(
      (c) => !cachedConversations.includes(c.name)
    );

    if (newConversations.length > 0) {
      setRoutes(
        produce(routes, (draft) => {
          return { ...draft, ...reduceConversations(newConversations, events) };
        })
      );
      setCachedConversations((names) =>
        names.concat(newConversations.map((c) => c.name))
      );
    }
  }, [cachedConversations, conversations, events, routes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate((s) => s + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toNotify = useMemo(() => {
    return Object.values(routes).filter((route) => {
      if (isDigestedNotificationRoute(route) && route.repeatable) {
        return (
          messageAppConditionsMet(events.Messages, route.conditions) &&
          repeatableTimePassed(events.Messages, route)
        );
      }
      return messageAppConditionsMet(events.Messages, route.conditions);
    });
  }, [events.Messages, routes, update]);

  const dispatchNotification = useCallback(
    (route: DigestedNotificationRouteType) => {
      const message = convertMessageToString(
        route.exchanges.slice(-1)[0].messageContent
      );
      dispatch({
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
          type: ROUTE_TYPE.NOTIFICATION,
          name: route.name,
          routeId: route.id.toString(),
          messageTimestamps: new Array(route.exchanges.length).fill(
            new Date().toISOString()
          ),
          logline: message,
          status: ROUTE_STATUS_TYPE.AVAILABLE,
        },
      });
    },
    [dispatch]
  );

  const dispatchChoosable = useCallback(
    (route: AbstractDigestedRouteType) => {
      dispatch({
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
          type: ROUTE_TYPE.CHOOSE,
          name: route.name,
          routeId: route.id.toString(),
          status: ROUTE_STATUS_TYPE.AVAILABLE,
        },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const cb = async () => {
      const ids = toNotify.map((route) => createRouteKey(route));
      setRoutes((internRoutes) =>
        produce(internRoutes, (draft) => {
          for (const id of ids) {
            const route = draft[id];
            //TODO figure out how to handle repeatable routes
            delete draft[id];
          }
          return draft;
        })
      );
      for (const route of toNotify) {
        await delayFor(route.delay || 0);
        if (isDigestedChoosableRoute(route)) dispatchChoosable(route);
        if (isDigestedNotificationRoute(route)) dispatchNotification(route);
      }
    };
    cb();
  }, [dispatchChoosable, dispatchNotification, toNotify]);
};

const reduceConversations = (
  conversations: ConversationFileType[],
  events: AppEventsType
) => {
  return conversations.reduce(
    (ret, conversation) => {
      const [untriggered] = reduceAndSortRoutes(
        conversation,
        events.Messages,
        {}
      );
      Object.keys(untriggered).reduce((acc, key) => {
        acc[`${conversation.name}-${key}`] = untriggered[key];
        return acc;
      }, ret);
      return ret;
    },
    {} as { [index: string]: AbstractDigestedRouteType }
  );
};
