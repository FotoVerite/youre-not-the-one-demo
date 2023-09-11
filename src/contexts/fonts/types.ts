import { PropsWithChildren, ReactNode } from "react";

import { skFontRecords } from "./hooks/useFonts";

export type FontsContextDigestType = {
  children: ReactNode;
};

export type FontsContextDigestedType = PropsWithChildren<{
  fonts: skFontRecords;
}>;
