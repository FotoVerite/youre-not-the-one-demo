import { AppResolverCallbackType } from "@Components/Main/hooks/useSplashAnimation";
import { PropsWithChildren, ReactNode } from "react";

import { skFontRecords } from "./hooks/useFonts";

export type FontsContextDigestType = {
  children: ReactNode;
  resolver: AppResolverCallbackType;
};

export type FontsContextDigestedType = PropsWithChildren<{
  fonts: skFontRecords;
}>;
