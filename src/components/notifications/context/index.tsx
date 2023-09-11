import React, { FC, useCallback, useContext, useReducer } from "react";
import { LOG, LOG_COLORS } from "src/utility/logger";

import {
  NotificationsContextTypeDigested,
  NotificationsContextTypeDigest,
} from "./types";
import NotificationPopupContainer from "../NotificationPopupContainer";
import notificationReducer from "../reducer";
import { NotificationsReducerActionsType } from "../reducer/types";

//defaults for empty app
export const NotificationsContext = React.createContext<
  NotificationsContextTypeDigested | undefined
>(undefined);

const NotificationsContextProvider: FC<NotificationsContextTypeDigest> = ({
  children,
}) => {
  const [notifications, _dispatch] = useReducer(notificationReducer, [
    {
      index: 0,
      active: true,
      title: "control",
      content: "control",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const dispatch = useCallback(
    (args: NotificationsReducerActionsType) => {
      _dispatch(args);
    },
    [_dispatch],
  );
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        dispatch,
      }}
    >
      <NotificationPopupContainer
        notifications={notifications}
        dispatch={dispatch}
      />
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
export const NotificationsContextConsumer = NotificationsContext.Consumer;

export const useNotificationContext = () => {
  const ERROR_MESSAGE = "NotificationsContext called outside it's provider";
  const context = useContext(NotificationsContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};
