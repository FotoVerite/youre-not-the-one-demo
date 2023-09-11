import { PropsWithChildren, ReactNode } from "react";

import {
  NotificationType,
  NotificationsReducerActionsType,
} from "../reducer/types";

export type NotificationsContextTypeDigest = {
  children: ReactNode;
};

export type NotificationsContextTypeDigested = PropsWithChildren<{
  notifications: NotificationType[];
  dispatch: (args: NotificationsReducerActionsType) => void;
}>;
