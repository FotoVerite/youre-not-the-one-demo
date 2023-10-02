import { RouteObjectType } from "../../routes/seen";
import { DigestedConversationType } from "../digestion/types";

export const findUnseenNotification = (
  draft: DigestedConversationType,
  seenRoutes: RouteObjectType[],
) => {
  const routesNeedingAppending = seenRoutes.filter(
    (route) => !draft.seenRoutes.includes(route.routeId),
  );
  const notificationRouteObject = routesNeedingAppending.shift();
  if (notificationRouteObject == null || draft.notificationRoutes == null)
    return;
  return draft.notificationRoutes.find(
    (n) => n.id.toString() === notificationRouteObject.routeId,
  );
};
