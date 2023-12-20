import { MessageAppEventsType } from "@Components/appEvents/reducer/types";

import { ROUTE_STATUS_TYPE } from "./types";

export const filterRouteEventsByStatus = (
  events: MessageAppEventsType,
  status: ROUTE_STATUS_TYPE | ROUTE_STATUS_TYPE[]
) => {
  return Object.entries(events.routes).filter(([id, route]) => {
    if (route.status === undefined) return false;
    if (Array.isArray(status)) {
      return status.includes(route.status);
    }
    return route.status === status;
  });
};

export const findRouteEventIdsByStatus = (
  events: MessageAppEventsType,
  status: ROUTE_STATUS_TYPE | ROUTE_STATUS_TYPE[]
) =>
  filterRouteEventsByStatus(events, status)
    .sort(([, routeA], [, RouteB]) =>
      routeA.createdAt > RouteB.createdAt ? 1 : -1
    )
    .map(([id]) => id);

export const findRouteEventByStatus = (
  events: MessageAppEventsType,
  status: ROUTE_STATUS_TYPE | ROUTE_STATUS_TYPE[]
) =>
  filterRouteEventsByStatus(events, status)
    .sort(([, routeA], [, RouteB]) =>
      routeA.createdAt > RouteB.createdAt ? -1 : 1
    )
    .map(([, route]) => route);
