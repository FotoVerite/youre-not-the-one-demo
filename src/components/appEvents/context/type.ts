import { PropsWithChildren, ReactNode } from "react";

import { AppEventsType, AppEventsReducerActionsType } from "../reducer/types";

export type AppEventsContextTypeDigest = {
  children: ReactNode;
};

export type AppEventsContextTypeDigested = PropsWithChildren<{
  state: AppEventsType;
  dispatch: (action: AppEventsReducerActionsType) => void;
}>;
