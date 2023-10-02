import { AppEventsType } from "@Components/appEvents/reducer/types";

import {
  mergeEffects,
  messageAppConditionsMet,
  messagesConditionalCheck,
} from "./conditionals";
import { MessageRouteType, NotificationRouteType } from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";

export const findAvailableRoutes = <
  AvailableRouteType extends NotificationRouteType | MessageRouteType,
>(
  name: MESSAGE_CONTACT_NAME,
  routes: AvailableRouteType[],
  state: AppEventsType
) => {
  if (routes == null || routes.length === 0) {
    return [] as AvailableRouteType[];
  } else {
    return routes
      .filter((route) => {
        // Convert number to string due to objects keys needing to be strings
        const finishedRoutes = Object.keys(
          state.Messages[name]?.routes || {}
        ).filter((key) => state.Messages[name].routes[key].finished);
        return (
          !finishedRoutes.includes(route.id.toString()) &&
          (route.conditions == null ||
            messageAppConditionsMet(state.Messages, route.conditions))
        );
      })
      .map((route) =>
        mergeEffects(messagesConditionalCheck(route, state), state)
      ) as AvailableRouteType[];
  }
};
