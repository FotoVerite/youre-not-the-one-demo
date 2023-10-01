import { AppResolverCallbackType } from "@Components/Main/hooks/useSplashAnimation";
import { AppEventsType } from "@Components/appEvents/reducer/types";
import { PropsWithChildren, ReactNode } from "react";

export type StorageContextDigestType = {
  children: ReactNode;
  resolver: AppResolverCallbackType;
};

export type StorageContextDigestedType = PropsWithChildren<{
  events: AppEventsType | false;
}>;
