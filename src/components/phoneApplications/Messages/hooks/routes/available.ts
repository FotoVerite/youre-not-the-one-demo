import { AppEventsType } from "@Components/appEvents/reducer/types";

import { findRouteEventIdsByStatus } from "./filter";
import {
  ChoosableRouteType,
  NotificationRouteType,
  ROUTE_STATUS_TYPE,
} from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";

export const filterSeenRoutes = (
  name: MESSAGE_CONTACT_NAME,
  routes: (NotificationRouteType | ChoosableRouteType)[],
  events: AppEventsType
) => {
  if (routes == null || routes.length === 0) {
    return [];
  }
  const contactEvents = events.Messages[name];
  const seenRouteIds = findRouteEventIdsByStatus(contactEvents, [
    ROUTE_STATUS_TYPE.STARTED,
    ROUTE_STATUS_TYPE.FINISHED,
  ]);
  return routes.filter((r) => !seenRouteIds.includes(r.id.toString()));
};

export const hasStartableRoute = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType
) =>
  findRouteEventIdsByStatus(events.Messages[name], [
    ROUTE_STATUS_TYPE.AVAILABLE,
  ]).length > 0;
