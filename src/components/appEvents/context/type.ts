import { AppResolverCallbackType } from "@Components/Main/CacheLoader/types";
import { PropsWithChildren, ReactNode } from "react";

import { AppEventsType, AppEventsReducerActionsType } from "../reducer/types";

export type AppEventsContextTypeDigest = {
  data: string | undefined;
  children: ReactNode;
  resolver: AppResolverCallbackType;
};

export type AppEventsContextTypeDigested = PropsWithChildren<{
  state: AppEventsType;
  dispatch: (action: AppEventsReducerActionsType) => void;
}>;
