import {
  AppEventsType,
  MessageAppEventsContainerType,
  MessageAppEventsType,
} from "@Components/appEvents/reducer/types";

import {
  messageAppConditionsMet,
  messagesConditionalCheck,
  removeOptionsThatConditionsHaveNotBeenMet,
} from "./conditionals";
import { isDigestedChoosableRoute } from "./guards";
import { asyncResolveRoutes, resolveRoutePath } from "./resolver";
import {
  ActiveChoosableRoute,
  ActiveNotificationRoute,
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
    const startedRoutes = Object.keys(state.routes || {});
    // eslint-disable-next-line prettier/prettier
    return !startedRoutes.includes(route.id.toString());
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

export const createActiveRoute = async <
  AvailableRouteType extends
    | DigestedChoosableRouteType
    | DigestedNotificationRouteType,
>(
  width: number,
  events: AppEventsType,
  route: AvailableRouteType
) => {
  if (isDigestedChoosableRoute(route)) {
    const routes = await asyncResolveRoutes(width, events, route);
    return {
      ...route,
      routes,
      ...{
        finished: ROUTE_STATE_TYPE.ACTIVE as const,
        options: removeOptionsThatConditionsHaveNotBeenMet(
          events,
          route.options
        ),
      },
    };
  } else {
    const exchanges = await resolveRoutePath(width, events, route.exchanges);
    return {
      ...route,
      exchanges,
      ...{ finished: ROUTE_STATE_TYPE.ACTIVE as const },
    };
  }
};

export const findStartableRoute = async (
  width: number,
  name: MESSAGE_CONTACT_NAME,
  routes: (DigestedChoosableRouteType | DigestedNotificationRouteType)[],
  state: AppEventsType
): Promise<ActiveChoosableRoute | ActiveNotificationRoute | undefined> => {
  if (routes == null || routes.length === 0) {
    return;
  }
  const route = filterForStartableRoutes<
    DigestedChoosableRouteType | DigestedNotificationRouteType
  >(routes, state.Messages, state.Messages[name]).sort((a, b) =>
    a.order > b.order ? 1 : -1
  )[0];
  if (!route) {
    return;
  }
  return createActiveRoute(width, state, route);
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
