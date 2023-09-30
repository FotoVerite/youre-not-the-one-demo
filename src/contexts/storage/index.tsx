import { AppEventsType } from "@Components/appEvents/reducer/types";
import React, { FC, useContext, useEffect, useState } from "react";
import { LOG, LOG_COLORS } from "src/utility/logger";
import { getData } from "src/utility/storage";

import { StorageContextDigestedType, StorageContextDigestType } from "./types";

//defaults for empty app
const StorageContext = React.createContext<
  StorageContextDigestedType | undefined
>(undefined);

const StorageContextProvider: FC<StorageContextDigestType> = (props) => {
  const [events, setEvents] = useState<AppEventsType | false | undefined>();
  useEffect(() => {
    getData("events").then((data) =>
      setEvents(data ? JSON.parse(data) : false)
    );
  }, []);

  if (events != null) {
    return (
      <StorageContext.Provider value={{ events }}>
        {props.children}
      </StorageContext.Provider>
    );
  }
  return <></>;
};

export default StorageContextProvider;
export const StorageContextConsumer = StorageContext.Consumer;

export const useStorageContext = () => {
  const ERROR_MESSAGE = "Storage Context called outside of provider";
  const context = useContext(StorageContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};
