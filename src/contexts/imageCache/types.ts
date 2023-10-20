import { AppResolverCallbackType } from "@Components/Main/hooks/useSplashAnimation";
import { SkImage } from "@shopify/react-native-skia";
import { PropsWithChildren, ReactNode } from "react";
import { Image } from "react-native";

export type ImageType = SkImage | Image | undefined | null;

export type ImageCacheType = Record<string, ImageType>;

export type ImageCacheContextDigestType = {
  children: ReactNode;
  data?: string;
  resolver: AppResolverCallbackType;
};

export type ImageCacheContextDigestedType = PropsWithChildren<{
  cache: ImageCacheType;
  addImage: (filename: string, image: SkImage) => void;
}>;
