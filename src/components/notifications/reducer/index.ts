import { produce } from "immer";

import {
  NOTIFICATIONS_REDUCER_ACTIONS,
  NotificationType,
  NotificationsReducerActionsType,
} from "./types";

const notificationReducer = produce(
  (
    draft: NotificationType[],
    action: NotificationsReducerActionsType
  ): NotificationType[] => {
    switch (action.type) {
      case NOTIFICATIONS_REDUCER_ACTIONS.ADD: {
        // Needs Ternary since active is a simple boolean
        const active =
          action.payload.active != null ? action.payload.active : true;
        const notification: NotificationType = {
          ...action.payload,
          ...{
            active,
            index: draft.length,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
        draft.push(notification);
        return draft;
      }
      case NOTIFICATIONS_REDUCER_ACTIONS.UPDATE: {
        const { index, ...props } = action.payload;
        draft[index] = {
          ...draft[index],
          updatedAt: new Date(),
          ...props,
        };
        return draft;
      }
      case NOTIFICATIONS_REDUCER_ACTIONS.DELETE:
        draft.splice(action.payload.index, 1);
        return draft;
      case NOTIFICATIONS_REDUCER_ACTIONS.RESET:
        return [] as NotificationType[];
      default:
        return draft;
    }
  }
);

export default notificationReducer;
