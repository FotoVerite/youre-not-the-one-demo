import { APP_EVENTS_ACTIONS } from "@Components/appEvents/reducer/types";

import {
  DigestedConversationType,
  DigestedConversationWithAvailableRoute,
} from "../digestion/types";

export const createCleanupPayload = (
  draft: DigestedConversationWithAvailableRoute,
  forewordToIndex: number,
  finished: boolean
) => {
  return {
    type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
    payload: {
      routeId: draft.availableRoute.id,
      name: draft.name,
      atIndex: (draft.routeAtIndex || 0) + forewordToIndex,
      finished,
    },
  };
};

export const routeStartedPayload = (
  draft: DigestedConversationType,
  routeID: number
) => ({
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
  payload: {
    name: draft.name,
    chosen: draft.chosenRoute,
    routeId: routeID,
    atIndex: 1,
    finished: false,
  },
});

export const routeUpdatePayload = (
  draft: DigestedConversationWithAvailableRoute
) => ({
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
  payload: {
    routeId: draft.availableRoute.id,
    name: draft.name,
    atIndex: draft.routeAtIndex,
  },
});

export const routeFinishedPayload = (
  draft: DigestedConversationWithAvailableRoute,
  routeID: number
) => ({
  type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
  payload: {
    routeId: routeID,
    name: draft.name,
    finished: true,
  },
});
