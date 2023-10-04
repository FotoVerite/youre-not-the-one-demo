import {
  NotificationRouteType,
  ChoosableRouteType,
  DigestedChoosableRouteType,
  DigestedNotificationRouteType,
  StartedRouteType,
  ROUTE_STATE_TYPE,
  ActiveNotificationRoute,
  ROUTE_TYPE,
  ActiveChoosableRoute,
  AbstractDigestedRouteType,
} from "./types";

export const isChoosableRoute = (
  route: NotificationRouteType | ChoosableRouteType
): route is ChoosableRouteType => {
  return route != null && route.hasOwnProperty("options");
};

export const isDigestedChoosableRoute = (
  route: DigestedChoosableRouteType | DigestedNotificationRouteType
): route is DigestedChoosableRouteType => {
  return route != null && route.hasOwnProperty("options");
};

export const isStarted = (
  route: AbstractDigestedRouteType | undefined
): route is StartedRouteType => {
  return route != null && route.finished === ROUTE_STATE_TYPE.STARTED;
};

export const isActiveNotificationRoute = (
  route: AbstractDigestedRouteType | undefined
): route is ActiveNotificationRoute => {
  return (
    route != null &&
    route.finished === ROUTE_STATE_TYPE.ACTIVE &&
    route.type === ROUTE_TYPE.NOTIFICATION
  );
};

export const isActiveChoosableRoute = (
  route: AbstractDigestedRouteType | undefined
): route is ActiveChoosableRoute => {
  return (
    route != null &&
    route.finished === ROUTE_STATE_TYPE.ACTIVE &&
    route.type === ROUTE_TYPE.CHOOSE
  );
};
