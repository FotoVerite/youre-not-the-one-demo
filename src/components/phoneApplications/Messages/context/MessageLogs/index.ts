import { CACHED_KEYS } from "@Components/Main/CacheLoader/types";
import { SkImage } from "@shopify/react-native-skia";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { LOG, LOG_COLORS } from "src/utility/logger";
import { storeData } from "src/utility/storage";

import {
  MessageLogsContextProvider,
  MessageLogsType,
  MessageLogsContextDigestedType,
} from "./types";
//defaults for empty app
const MessageLogsContext = React.createContext<
  MessageLogsContextDigestedType | undefined
>(undefined);

const convertMessageLogToJSON = (cache: MessageLogsType) =>
  JSON.stringify(Object.keys(cache));

const MessageLogsContextProvider: FC<  MessageLogsContextProvider,
> = ({
  children,
}) => {
  const [images, setImages] = useState<MessageLogType>();
  useEffect(() => {
    const cb = async () => {
      console.log();
      if (data == null) {
        return setImages({});
      }
      const ret = await imageResolver(JSON.parse(data));
      setImages(ret);
    };
    cb();
  }, [data]);

  useEffect(() => {
    if (images != null) resolver(CACHED_KEYS.IMAGES, true);
  }, [images, resolver]);

  useEffect(() => {
    if (images) {
      storeData(CACHED_KEYS.IMAGES, convertMessageLogToJSON(images));
    }
  }, [images]);

  const addImage = useCallback(
    (filename: string, image: SkImage) =>
      setImages((cache) => {
        cache = cache || {};
        cache[filename] = image;
        return cache;
      }),
    [setImages]
  );

  if (images != null) {
    return (
      <MessageLogsContext.Provider value={{ cache: images, addImage }}>
        {children}
      </MessageLogsContext.Provider>
    );
  }
  return <></>;
};

export default MessageLogContextProvider;
export const MessageLogContextConsumer = MessageLogContext.Consumer;

export const useMessageLogContext = () => {
  const ERROR_MESSAGE = "Message Logs called outside of provider";
  const context = useContext(MessageLogsContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};
