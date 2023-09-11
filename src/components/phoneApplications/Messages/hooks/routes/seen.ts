import {
  AppEventsType,
  MessageRouteEventDataType,
  MessageRouteEventType,
} from "@Components/appEvents/reducer/types";

import { messageAppConditionsMet } from "./available";
import { MessageRouteType, NotificationRouteType } from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import { EFFECT_TYPE } from "../contentWithMetaTypes";
import { ExchangeBlockType } from "../useConversations/types";

export type SeenRouteType = {
  [index: string]: { [key: string]: ExchangeBlockType[] };
};

export type RouteObjectType = {
  routeId: string;
  exchanges: ExchangeBlockType[];
} & MessageRouteEventDataType;

const constructAvailableRouteObject = (
  events: AppEventsType,
  availableRoutes: MessageRouteType[],
) => {
  const routes: SeenRouteType = {};
  availableRoutes.forEach((route) => {
    routes[route.id] = route.routes;
    const FullReplacement = route.effects?.filter(
      (effect) =>
        effect.type === EFFECT_TYPE.FULL_REPLACEMENT &&
        messageAppConditionsMet(events.Messages, effect.conditions),
    )[0];
    if (FullReplacement) {
      routes[route.id] = FullReplacement.data;
    }
  });
  return routes;
};

const constructSeenRoutes = (
  routeEvents: MessageRouteEventType,
  availableRoutes: SeenRouteType,
) => {
  const ret: RouteObjectType[] = [];
  for (const [key, value] of Object.entries(routeEvents)) {
    if (availableRoutes[key] == null || !value.finished) {
      continue;
    }
    ret.push(
      Object.assign(
        {},
        { routeId: key },
        { ...value },
        { exchanges: availableRoutes[key][value.chosen!] },
      ),
    );
  }
  ret.sort((a, b) => a.position - b.position);
  return ret;
};

const constructSeenNotificationRoutes = (
  routeEvents: MessageRouteEventType,
  availableRoutes: NotificationRouteType[],
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
        { exchanges: event.exchanges },
      ),
    );
  }
  ret.sort((a, b) => a.position - b.position);
  return ret;
};

export const getSeenOptionRoutes = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: MessageRouteType[],
) => {
  if (!availableRoutes) {
    return [];
  }
  const routeEvents = events.Messages[name]?.routes || {};

  return constructSeenRoutes(
    routeEvents,
    constructAvailableRouteObject(events, availableRoutes),
  );
};

export const getSeenEventRoutes = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: NotificationRouteType[],
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
  availableEventBasedRoutes?: NotificationRouteType[],
) => {
  const routes = getSeenOptionRoutes(name, events, availableRoutes)
    .concat(getSeenEventRoutes(name, events, availableEventBasedRoutes))
    .sort((a, b) => a.position - b.position);
  return routes;
};

export const getUnfinishedRouteID = (
  name: MESSAGE_CONTACT_NAME,
  events: AppEventsType,
  availableRoutes?: MessageRouteType[],
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
  availableNotificationRoutes?: NotificationRouteType[],
): RouteObjectType | undefined => {
  return getSeenRoutes(
    name,
    events,
    availableRoutes,
    availableNotificationRoutes,
  ).slice(-1)[0];
};
