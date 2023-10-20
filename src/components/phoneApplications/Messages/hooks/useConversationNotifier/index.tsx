import { useAppEventsContext } from "@Components/appEvents/context";
import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
} from "@Components/appEvents/reducer/types";
import { useState, useCallback, useMemo, useEffect } from "react";

import { MESSAGE_CONTACT_NAME } from "../../constants";
import { messageAppConditionsMet } from "../routes/conditionals";
import {
  isDigestedChoosableRoute,
  isDigestedNotificationRoute,
} from "../routes/guards";
import {
  ROUTE_STATUS_TYPE,
  AbstractDigestedRouteType,
  DigestedNotificationRouteType,
} from "../routes/types";
import { reduceAndSortRoutes } from "../useConversation/digestion/routeReducers";
import { convertMessageToString } from "../useConversations/determineLogLine";
import { ConversationFileType } from "../useConversations/types";
import { delayFor } from "src/utility/async";

export const useConversationNotifier = (
  conversations: ConversationFileType[]
) => {
  const eventsContext = useAppEventsContext();
  const { state: events, dispatch } = eventsContext;
  const [routes, setRoutes] = useState(
    reduceConversations(conversations, events)
  );

  const toNotify = useMemo(() => {
    return Object.values(routes).filter((route) =>
      messageAppConditionsMet(events.Messages, route.conditions)
    );
  }, [events.Messages, routes]);

  const dispatchNotification = useCallback(
    (route: DigestedNotificationRouteType) => {
      const message = convertMessageToString(
        route.exchanges.slice(-1)[0].messageContent
      );
      dispatch({
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
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
      const internalRoutes = { ...routes };
      for (const route of toNotify) {
        await delayFor(route.delay || 0);
        if (isDigestedChoosableRoute(route)) dispatchChoosable(route);
        if (isDigestedNotificationRoute(route)) dispatchNotification(route);
        delete internalRoutes[`${route.id}-${route.name}`];
      }
      setRoutes(internalRoutes);
    };
    cb();
  }, [dispatchChoosable, dispatchNotification, routes, toNotify]);
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
