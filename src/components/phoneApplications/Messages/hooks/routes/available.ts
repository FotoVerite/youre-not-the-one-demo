import {
  AppEventsType,
  MessageAppEventsContainerType,
  MessageAppEventsType,
} from "@Components/appEvents/reducer/types";

import {
  messageAppConditionsMet,
  messagesConditionalCheck,
} from "./conditionals";
import {
  ChoosableRouteType,
  DigestedChoosableRouteType,
  DigestedNotificationRouteType,
  NotificationRouteType,
  ROUTE_STATE_TYPE,
} from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";

type GenericRouteType =
  | NotificationRouteType
  | ChoosableRouteType
  | DigestedChoosableRouteType
  | DigestedNotificationRouteType;

export const filterForStartableRoutes = <T extends GenericRouteType>(
  routes: T[],
  events: MessageAppEventsContainerType,
  state: MessageAppEventsType
): T[] => {
  return routes.filter((route) => {
    // Convert number to string due to objects keys needing to be strings
    const finishedRoutes = Object.keys(state.routes || {}).filter(
      (key) => state.routes[key].finished
    );
    return (
      !finishedRoutes.includes(route.id.toString()) &&
      (route.conditions == null ||
        messageAppConditionsMet(events, route.conditions))
    );
  });
};

const filterForAvailableRoutes = <T extends GenericRouteType>(
  routes: T[],
  events: MessageAppEventsContainerType,
  state: MessageAppEventsType
): T[] => {
  return routes.filter((route) => {
    // Convert number to string due to objects keys needing to be strings
    const startedRoutes = Object.keys(state.routes || {})
    // eslint-disable-next-line prettier/prettier
    return (
      !startedRoutes.includes(route.id.toString())
    );
  });
};

export const hasStartableRoute = (
  name: MESSAGE_CONTACT_NAME,
  routes: (
    | NotificationRouteType
    | ChoosableRouteType
    | DigestedChoosableRouteType
    | DigestedNotificationRouteType
  )[],
  state: AppEventsType
) => {
  if (routes == null || routes.length === 0) {
    return false;
  }
  return (
    filterForStartableRoutes(routes, state.Messages, state.Messages[name])
      .length !== 0
  );
};

export const findStartableRoute = (
  name: MESSAGE_CONTACT_NAME,
  routes: (DigestedChoosableRouteType | DigestedNotificationRouteType)[],
  state: AppEventsType
) => {
  if (routes == null || routes.length === 0) {
    return;
  }
  let route = filterForStartableRoutes<
    DigestedChoosableRouteType | DigestedNotificationRouteType
  >(routes, state.Messages, state.Messages[name]).sort(
    (a, b) => a.order - b.order
  )[0];
  if (!route) {
    return;
  }
  route = messagesConditionalCheck(state, route);
  return {
    ...route,
    ...{ finished: ROUTE_STATE_TYPE.ACTIVE as const },
  };
};

export const findStartableRoutes = (
  name: MESSAGE_CONTACT_NAME,
  routes: (NotificationRouteType | ChoosableRouteType)[],
  state: AppEventsType
) => {
  if (routes == null || routes.length === 0) {
    return [];
  }
  return filterForStartableRoutes<NotificationRouteType | ChoosableRouteType>(
    routes,
    state.Messages,
    state.Messages[name]
  );
};

export const findAvailableRoutes = (
  name: MESSAGE_CONTACT_NAME,
  routes: (NotificationRouteType | ChoosableRouteType)[],
  state: AppEventsType
) => {
  if (routes == null || routes.length === 0) {
    return [];
  }
  return filterForAvailableRoutes<NotificationRouteType | ChoosableRouteType>(
    routes,
    state.Messages,
    state.Messages[name]
  );
};

