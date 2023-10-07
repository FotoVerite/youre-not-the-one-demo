import {
  APP_EVENTS_ACTIONS,
  EventPropsPayloadType,
} from "@Components/appEvents/reducer/types";

import { StartedRouteType } from "../../routes/types";
import {
  DigestedConversationType,
  DigestedConversationWithStartedRoute,
} from "../digestion/types";

export const createCleanupPayload = (
  draft: DigestedConversationWithStartedRoute,
  forewordToIndex: number,
  finished: boolean,
  logline: string,
) => {
  return {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
    payload: {
      routeId: draft.activeRoute.id,
      name: draft.name,
      atIndex: forewordToIndex,
      finished,
      logline,
    },
  };
};

export const routeStartedPayload = (
  draft: DigestedConversationType,
  route: StartedRouteType,
  logline: string,
) => ({
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
  payload: {
    logline,
    name: draft.name,
    chosen: route.chosen,
    routeId: route.id,
    atIndex: 1,
    finished: false,
  },
});

export const routeUpdatePayload = (
  draft: DigestedConversationWithStartedRoute,
  logline: string,
) => ({
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
  payload: {
    logline,
    routeId: draft.activeRoute.id,
    name: draft.name,
    atIndex: draft.activeRoute.indexAt + 1,
  },
});

export type RouteOptionalProps = {
  logline?: string;
  atIndex?: number;
  messageTimestamps?: string[];
};
export const routeFinishedPayload = (
  draft: DigestedConversationWithStartedRoute,
  options?: RouteOptionalProps,
) => {
  const payload = {
    routeId: draft.activeRoute.id,
    name: draft.name,
    finished: true,
  } as EventPropsPayloadType;
  return {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
    payload: { ...payload, ...options },
  };
};
