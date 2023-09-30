import { useNotificationContext } from "@Components/notifications/context";
import {
  NOTIFICATIONS_REDUCER_ACTIONS,
  NotificationDataType,
} from "@Components/notifications/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { PHONE_APPLICATION_NAMES } from "src/constants/phoneApplicationNames";
import { LOG, LOG_COLORS } from "src/utility/logger";

import {
  AppEventsContextTypeDigest,
  AppEventsContextTypeDigested,
} from "./type";
import eventsReducer from "../reducer";
import {
  AppEventsReducerActionsType,
  AppEventsType,
  MessageAppEventsContainerType,
} from "../reducer/types";
import { getData } from "src/utility/storage";
import { useStorageContext } from "src/contexts/storage";

//defaults for empty app
const AppEventsContext = React.createContext<
  AppEventsContextTypeDigested | undefined
>(undefined);

const setInitialState = (state: AppEventsType | false) => {
  if (state) {
    return state;
  }
  const defaultState = {
    [PHONE_APPLICATION_NAMES.MESSAGES]: {} as MessageAppEventsContainerType,
    NOTIFICATIONS: [],
  };
  const messageState = defaultState.Messages;
  for (const name of Object.values(MESSAGE_CONTACT_NAME)) {
    if (messageState[name] === undefined) {
      messageState[name] = { views: [], routes: {}, blocked: false };
    }
  }
  return defaultState;
};

const AppEventsContextProvider: FC<AppEventsContextTypeDigest> = (props) => {
  const sentNotifications = useRef<NotificationDataType[]>([]);
  const { dispatch: notificationDispatch } = useNotificationContext();
  const storage = useStorageContext();

  const [events, dispatch] = useReducer(
    eventsReducer,
    setInitialState(storage.events)
  );

  const memoizedDispatch = useCallback(
    (action: AppEventsReducerActionsType) => {
      dispatch(action);
    },
    []
  );

  useEffect(() => {
    sentNotifications.current = storage.events
      ? storage.events.NOTIFICATIONS
      : [];
  }, [storage.events]);

  useEffect(() => {
    const newNotifications = events.NOTIFICATIONS.filter(
      (notification) => !sentNotifications.current.includes(notification)
    );
    newNotifications.forEach((notification) =>
      notificationDispatch({
        type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
        payload: notification,
      })
    );
    sentNotifications.current =
      sentNotifications.current.concat(newNotifications);
  }, [events.NOTIFICATIONS, notificationDispatch]);

  return (
    <AppEventsContext.Provider
      value={{
        state: events,
        dispatch: memoizedDispatch,
      }}
    >
      {props.children}
    </AppEventsContext.Provider>
  );
};

export default AppEventsContextProvider;
export const AppEventsContextConsumer = AppEventsContext.Consumer;

export const useAppEventsContext = () => {
  const ERROR_MESSAGE = "Event Context called outside of provider";
  const context = useContext(AppEventsContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};
