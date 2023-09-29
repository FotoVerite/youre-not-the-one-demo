import { AppEventsType } from "@Components/appEvents/reducer/types";
import { PropsWithChildren, ReactNode } from "react";

export type StorageContextDigestType = {
  children: ReactNode;
};

export type StorageContextDigestedType = PropsWithChildren<{
  events: AppEventsType | false;
}>;
