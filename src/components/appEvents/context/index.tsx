import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import React, { FC, useCallback, useContext, useReducer } from "react";
import { PHONE_APPLICATION_NAMES } from "src/constants/phoneApplicationNames";
import { LOG, LOG_COLORS } from "src/utility/logger";

import {
  AppEventsContextTypeDigest,
  AppEventsContextTypeDigested,
} from "./type";
import eventsReducer from "../reducer";
import {
  AppEventsReducerActionsType,
  MessageAppEventsContainerType,
} from "../reducer/types";

//defaults for empty app
const AppEventsContext = React.createContext<
  AppEventsContextTypeDigested | undefined
>(undefined);

const AppEventsContextProvider: FC<AppEventsContextTypeDigest> = (props) => {
  const setDefaultMessageEventState = (
    state: MessageAppEventsContainerType,
  ) => {
    for (const name of Object.values(MESSAGE_CONTACT_NAME)) {
      if (state[name] === undefined) {
        state[name] = { views: [], routes: {}, blocked: false };
      }
    }
    return state;
  };

  const [events, dispatch] = useReducer(eventsReducer, {
    [PHONE_APPLICATION_NAMES.MESSAGES]: setDefaultMessageEventState({}),
  });
  const memoizedDispatch = useCallback(
    (action: AppEventsReducerActionsType) => {
      dispatch(action);
    },
    [],
  );

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
