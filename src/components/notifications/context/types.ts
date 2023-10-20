import { AppResolverCallbackType } from "@Components/Main/hooks/useSplashAnimation";
import { PropsWithChildren, ReactNode } from "react";

import {
  NotificationType,
  NotificationsReducerActionsType,
} from "../reducer/types";

export type NotificationsContextTypeDigest = {
  children: ReactNode;
  data: string | undefined;
  resolver: AppResolverCallbackType;
};

export type NotificationsContextTypeDigested = PropsWithChildren<{
  notifications: NotificationType[];
  dispatch: (args: NotificationsReducerActionsType) => void;
}>;
