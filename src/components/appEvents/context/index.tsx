import { CACHED_KEYS } from "@Components/Main/CacheLoader/types";
import { useNotificationContext } from "@Components/notifications/context";
import {
  NOTIFICATIONS_REDUCER_ACTIONS,
} from "@Components/notifications/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
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

//defaults for empty app
const AppEventsContext = React.createContext<
  AppEventsContextTypeDigested | undefined
>(undefined);

const setInitialState = (state: string | undefined) => {
  if (state) {
    const data = JSON.parse(state) as AppEventsType;
    data.notificationPayload = undefined;
    return data;
  }
  const defaultState = {
    [PHONE_APPLICATION_NAMES.MESSAGES]: {} as MessageAppEventsContainerType,
    notificationPayload: undefined,
  };
  const messageState = defaultState.Messages;
  for (const name of Object.values(MESSAGE_CONTACT_NAME)) {
    if (messageState[name] === undefined) {
      messageState[name] = { views: [], routes: {}, blocked: false };
    }
  }
  return defaultState;
};

const AppEventsContextProvider: FC<AppEventsContextTypeDigest> = ({
  children,
  resolver,
  data,
}) => {
  const { dispatch: notificationDispatch } = useNotificationContext();

  const [events, dispatch] = useReducer(eventsReducer, setInitialState(data));
  const notificationPayload = events.notificationPayload;

  const memoizedDispatch = useCallback(
    (action: AppEventsReducerActionsType) => {
      dispatch(action);
    },
    []
  );

  useEffect(() => {
    if (events != null) resolver(CACHED_KEYS.EVENTS, true);
  }, [events, resolver]);

  useEffect(() => {
    if (notificationPayload) {
      notificationDispatch({
        type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
        payload: notificationPayload,
      });
    }
  }, [notificationDispatch, notificationPayload]);

  return (
    <AppEventsContext.Provider
      value={{
        state: events,
        dispatch: memoizedDispatch,
      }}
    >
      {children}
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
