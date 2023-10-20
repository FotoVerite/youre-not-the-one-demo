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
  OptionsWithConditionals,
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

export const areResolvedOptions = (
  options?: string[] | OptionsWithConditionals[]
): options is string[] => {
  return options != null && Array.isArray(options);
};

export const hasResolvedOptions = (
  route?: AbstractDigestedRouteType
): route is DigestedChoosableRouteType & { options: string[] } => {
  return isDigestedChoosableRoute(route) && areResolvedOptions(route.options);
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
// export const isDigestedChoosableRoute = (
//   route: DigestedChoosableRouteType | DigestedNotificationRouteType
// ): route is DigestedChoosableRouteType => {
//   return route != null && route.hasOwnProperty("options");
// };

// export const isOptionsWithConditions = (
//   options: string[] | OptionsWithConditionals[]
// ): options is OptionsWithConditionals[] => {
//   return (
//     options.filter(function (o) {
//       return o.hasOwnProperty("conditions");
//     }).length > 0
//   );
// };
// export const isDigestedWithConditionalOptions = (
//   route: DigestedChoosableRouteType | DigestedNotificationRouteType
// ): route is DigestedWithConditionalOptions => {
//   if (!isDigestedChoosableRoute(route)) return false;
//   return isOptionsWithConditions(route.options);
// };

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
// export const isActiveNotificationRoute = (
//   route: AbstractDigestedRouteType | undefined
// ): route is AvailableNotificationRoute => {
//   return (
//     route != null &&
//     route.status === ROUTE_STATUS_TYPE.AVAILABLE &&
//     route.type === ROUTE_TYPE.NOTIFICATION
//   );
// };

// export const isAvailableChoosableRoute = (
//   route: AbstractDigestedRouteType | undefined
// ): route is AvailableChoosableRoute => {
//   return (
//     route != null &&
//     route.status === ROUTE_STATUS_TYPE.AVAILABLE &&
//     route.type === ROUTE_TYPE.CHOOSE
//   );
// };

// export const hasMultipleMeetableConditions = (
//   route: AbstractDigestedRouteType | undefined
// ): route is DigestedRouteWithMultipleMeetableConditionsType => {
//   return route != null && typeof route.conditions === "object";
// };
