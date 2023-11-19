import {
  NotificationRouteType,
  ChoosableRouteType,
  AbstractDigestedRouteType,
  ROUTE_STATUS_TYPE,
  FinishedRouteType,
  AbstractRouteType,
  RouteConditionsType,
  StartedRouteType,
  AvailableRouteType,
  UntriggeredRouteType,
  DigestedChoosableRouteType,
  DigestedNotificationRouteType,
  OptionType,
} from "./types";

export const routeHasConditionals = (
  route?: AbstractRouteType | AbstractDigestedRouteType
): route is typeof route & {
  conditions: RouteConditionsType | RouteConditionsType[];
} => {
  return route != null && route.conditions != null;
};
export const isChoosableRoute = (
  route?: AbstractRouteType
): route is ChoosableRouteType => {
  return route != null && route.hasOwnProperty("options");
};

export const areSimpleOptions = (
  options?: string[] | OptionType[]
): options is string[] => {
  return (
    options != null &&
    options.every((option) => !option.hasOwnProperty("label"))
  );
};

export const isNotificationRoute = (
  route?: AbstractRouteType
): route is NotificationRouteType => !isChoosableRoute(route);

export const isDigestedChoosableRoute = (
  route?: AbstractDigestedRouteType
): route is DigestedChoosableRouteType =>
  route != null && route.hasOwnProperty("routes");

export const isDigestedNotificationRoute = (
  route?: AbstractDigestedRouteType
): route is DigestedNotificationRouteType =>
  route != null && route.hasOwnProperty("exchanges");

export const isUntriggeredRoute = (
  route: AbstractDigestedRouteType | undefined
): route is UntriggeredRouteType => {
  return route != null && route.status === ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET;
};
export const isAvailableRoute = (
  route: AbstractDigestedRouteType | undefined
): route is AvailableRouteType => {
  return route != null && route.status === ROUTE_STATUS_TYPE.AVAILABLE;
};
export const isStartedRoute = (
  route: AbstractDigestedRouteType | undefined
): route is StartedRouteType => {
  return route != null && route.status === ROUTE_STATUS_TYPE.STARTED;
};

export const isFinishedRoute = (
  route: AbstractDigestedRouteType | undefined
): route is FinishedRouteType => {
  return route != null && route.status === ROUTE_STATUS_TYPE.FINISHED;
};
