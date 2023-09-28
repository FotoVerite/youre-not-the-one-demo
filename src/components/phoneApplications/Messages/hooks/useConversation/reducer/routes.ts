import {
  DigestedConversationType,
  hasAvailableRoute,
} from "../digestion/types";

export const getPathViaPayload = (
  draft: DigestedConversationType,
  payload: { chosenOption: string }
) => {
  if (!hasAvailableRoute(draft)) return;
  return draft.availableRoute.routes[payload.chosenOption];
};

export const getNotificationPath = (
  draft: DigestedConversationType,
  routeID: number
) => {
  if (!draft.notificationRoutes) return;
  const route = draft.notificationRoutes.find((r) => r.id === routeID);
  if (route == null) return;
  return route.exchanges;
};
