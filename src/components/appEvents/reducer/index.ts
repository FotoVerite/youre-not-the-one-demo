import { produce } from "immer";
import {
  APP_EVENTS_ACTIONS,
  AppEventsType,
  AppEventsReducerActionsType,
} from "./types";

const eventsReducer = produce(
  (
    draft: AppEventsType,
    action: AppEventsReducerActionsType
  ): AppEventsType => {
    switch (action.type) {
      case APP_EVENTS_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN:
        console.log("MESSAGE_APP_CONVERSATION_SEEN", action.payload.name);
        draft.Messages[action.payload.name].views.push(new Date());
        return draft;
      case APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION:
        draft.Messages[action.payload.name].blocked = true;
        return draft;
      case APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE: {
        const { routeId, ...props } = action.payload;
        const routeInfo = draft.Messages[action.payload.name].routes;
        const position = Object.keys(routeInfo).length + 1;
        routeInfo[routeId.toString()] = {
          createdAt: new Date(),
          updatedAt: new Date(),
          position: position,
          ...props,
        };
        console.log(
          "MESSAGE_APP_ROUTE_CREATE",
          routeId.toString(),
          routeInfo[routeId.toString()]
        );
        // if (action.payload.notification) {
        //   console.log("NOTIFICATION", action.payload.notification.title);
        //   draft.NOTIFICATIONS.push(action.payload.notification);
        // }
        return draft;
      }
      case APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE: {
        const { routeId, ...props } = action.payload;
        const routeInfo = draft.Messages[action.payload.name].routes;
        const copy = { ...routeInfo[routeId.toString()] };
        routeInfo[routeId.toString()] = {
          ...routeInfo[routeId.toString()],
          ...props,
          ...{ updatedAt: new Date() },
        };
        console.log(
          "MESSAGE_APP_ROUTE_UPDATED",
          copy,
          routeInfo[routeId.toString()]
        );
        return draft;
      }
      default:
        return draft;
    }
  }
);

export default eventsReducer;
