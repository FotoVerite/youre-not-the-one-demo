import {
  AppEventsType,
  MessageRouteEventDataType,
  MessageRouteEventType,
} from "@Components/appEvents/reducer/types";

import { mergeEffectsForMessageRouteType } from "./conditionals";
import { MessageRouteType, NotificationRouteType } from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import { ExchangeBlockType } from "../useConversations/types";

export type SeenRoutesType = {
  [index: string]: { [key: string]: ExchangeBlockType[] };
};

export type RouteObjectType = {
  routeId: string;
  exchanges: ExchangeBlockType[];
} & MessageRouteEventDataType;

const constructSeenRouteObject = (
  events: AppEventsType,
  availableRoutes: MessageRouteType[]
) => {
  return availableRoutes.reduce((routes, route) => {
    routes[route.id] = mergeEffectsForMessageRouteType(route, events).routes;
    return routes;
  }, {} as SeenRoutesType);
};

const constructSeenRoutes = (
  routeEvents: MessageRouteEventType,
  seenRoutes: SeenRoutesType
) => {
  const ret: RouteObjectType[] = [];
  for (const [key, value] of Object.entries(routeEvents)) {
    if (seenRoutes[key] == null || !value.finished) {
      continue;
    }
    ret.push(
      Object.assign(
        {},
        { routeId: key },
        { ...value },
        { exchanges: seenRoutes[key][value.chosen!] }
      )
    );
  }
  ret.sort((a, b) => a.position - b.position);
  return ret;
};

const constructSeenNotificationRoutes = (
  routeEvents: MessageRouteEventType,
  availableRoutes: NotificationRouteType[]
) => {
  const ret: RouteObjectType[] = [];
  for (const [key, value] of Object.entries(routeEvents)) {
    const event = availableRoutes.find((a) => a.id.toString() === key);
    if (event == null) {
      continue;
    }
    ret.push(
      Object.assign(
        {},
        { routeId: key },
        { ...value },
        { exchanges: event.exchanges }
      )
    );
  }
  ret.sort((a, b) => a.position - b.position);
  return ret;
};

export const getSeenOptionRoutes = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: MessageRouteType[]
) => {
  if (!availableRoutes) {
    return [];
  }
  const routeEvents = events.Messages[name]?.routes || {};

  return constructSeenRoutes(
    routeEvents,
    constructSeenRouteObject(events, availableRoutes)
  );
};

export const getSeenEventRoutes = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: NotificationRouteType[]
) => {
  if (!availableRoutes) {
    return [];
  }
  const routeEvents = events.Messages[name]?.routes || {};

  return constructSeenNotificationRoutes(routeEvents, availableRoutes);
};

export const getSeenRoutes = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: MessageRouteType[],
  availableEventBasedRoutes?: NotificationRouteType[]
) => {
  const routes = getSeenOptionRoutes(name, events, availableRoutes)
    .concat(getSeenEventRoutes(name, events, availableEventBasedRoutes))
    .sort((a, b) => a.position - b.position);
  return routes;
};

export const getUnfinishedRouteID = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: MessageRouteType[]
) => {
  const unfinishedRouteID = Object.keys(events.Messages[name]?.routes || {})
    .filter((key) => !events.Messages[name].routes[key].finished)
    .shift();
  if (!unfinishedRouteID || !availableRoutes) {
    return undefined;
  }
  return unfinishedRouteID;
};

export const getLastSeenRoute = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: MessageRouteType[],
  availableNotificationRoutes?: NotificationRouteType[]
): RouteObjectType | undefined => {
  return getSeenRoutes(
    name,
    events,
    availableRoutes,
    availableNotificationRoutes
  ).slice(-1)[0];
};
