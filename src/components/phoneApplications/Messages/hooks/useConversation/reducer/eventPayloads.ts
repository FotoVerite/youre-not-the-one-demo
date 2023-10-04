import { APP_EVENTS_ACTIONS } from "@Components/appEvents/reducer/types";

import { StartedRouteType } from "../../routes/types";
import {
  DigestedConversationType,
  DigestedConversationWithStartedRoute,
} from "../digestion/types";

export const createCleanupPayload = (
  draft: DigestedConversationWithStartedRoute,
  forewordToIndex: number,
  finished: boolean,
  logline: string
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
  logline: string
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
  index: number,
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

export const routeFinishedPayload = (
  draft: DigestedConversationWithStartedRoute
) => ({
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
  payload: {
    routeId: draft.activeRoute.id,
    name: draft.name,
    finished: true,
  },
});
