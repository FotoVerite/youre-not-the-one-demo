import {
  APP_EVENTS_ACTIONS,
  EventPropsPayloadType,
} from "@Components/appEvents/reducer/types";

import { ROUTE_STATUS_TYPE, StartedRouteType } from "../../routes/types";
import {
  DigestedConversationType,
  DigestedConversationWithStartedRoute,
} from "../digestion/types";

export const createCleanupPayload = (
  draft: DigestedConversationWithStartedRoute,
  forewordToIndex: number,
  status: ROUTE_STATUS_TYPE,
  logline?: string
) => {
  const payload = {
    routeId: draft.activeRoute.id,
    name: draft.name,
    atIndex: forewordToIndex,
    status,
    messageTimestamps: new Array(
      forewordToIndex - draft.activeRoute.indexAt
    ).fill(new Date().toISOString()),
  } as EventPropsPayloadType;
  if (logline) {
    payload.logline = logline;
  }
  return {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
    payload,
  };
};

export const routeStartedPayload = (
  draft: DigestedConversationType,
  route: StartedRouteType,
  logline: string
) => ({
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
  payload: {
    logline,
    name: draft.name,
    chosen: route.chosen,
    routeId: route.id,
    atIndex: 1,
    status: ROUTE_STATUS_TYPE.STARTED,
  },
});

export const routeUpdatePayload = (
  draft: DigestedConversationWithStartedRoute,
  logline: string
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
  options?: RouteOptionalProps
) => {
  const payload = {
    routeId: draft.activeRoute.id,
    name: draft.name,
    status: ROUTE_STATUS_TYPE.FINISHED,
  } as EventPropsPayloadType;
  return {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
    payload: { ...payload, ...options },
  };
};
