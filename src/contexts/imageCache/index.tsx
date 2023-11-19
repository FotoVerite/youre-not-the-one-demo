import { CACHED_KEYS } from "@Components/Main/CacheLoader/types";
import { SkImage } from "@shopify/react-native-skia";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { LOG, LOG_COLORS } from "src/utility/logger";
import { storeData } from "src/utility/storage";

import { imageResolver } from "./imageResolver";
import {
  ImageCacheContextDigestedType,
  ImageCacheContextDigestType,
  ImageCacheType,
} from "./types";
//defaults for empty app
const ImageCacheContext = React.createContext<
  ImageCacheContextDigestedType | undefined
>(undefined);

const convertImageCacheToJSON = (cache: ImageCacheType) =>
  JSON.stringify(Object.keys(cache));

const ImageCacheContextProvider: FC<ImageCacheContextDigestType> = ({
  children,
  data,
  resolver,
}) => {
  const [images, setImages] = useState<ImageCacheType>();
  useEffect(() => {
    const cb = async () => {
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
      storeData(CACHED_KEYS.IMAGES, convertImageCacheToJSON(images));
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
      <ImageCacheContext.Provider value={{ cache: images, addImage }}>
        {children}
      </ImageCacheContext.Provider>
    );
  }
  return <></>;
};

export default ImageCacheContextProvider;
export const ImageCacheContextConsumer = ImageCacheContext.Consumer;

export const useImageCacheContext = () => {
  const ERROR_MESSAGE = "ImageCache called outside of provider";
  const context = useContext(ImageCacheContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};
