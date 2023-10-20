import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ImageSourcePropType } from "react-native";

export enum NOTIFICATIONS_REDUCER_ACTIONS {
  ADD,
  DELETE,
  RESET,
  UPDATE,
}

export enum NOTIFICATION_ON_PRESS {
  CONVERSATION = "CONVERSATION",
}

export type OnPressType = {
  type: NOTIFICATION_ON_PRESS.CONVERSATION;
  payload: { name: MESSAGE_CONTACT_NAME };
};

export type NotificationDataType = {
  ID: string;
  active?: boolean;
  backgroundColor?: string;
  title: string;
  content: string;
  image?: ImageSourcePropType;
  onPress?: OnPressType;
};

export type NotificationType = NotificationDataType & {
  active: boolean;
  index: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AddNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.ADD;
  payload: NotificationDataType;
};

export type UpdateNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.UPDATE;
  payload: {
    [index in keyof NotificationDataType]?: NotificationDataType[index];
  } & {
    index: number;
  };
};

export type DeleteNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.DELETE;
  payload: { index: number };
};

export type ResetNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.RESET;
};

export type NotificationsReducerActionsType =
  | AddNotificationActionPayloadType
  | UpdateNotificationActionPayloadType
  | DeleteNotificationActionPayloadType
  | ResetNotificationActionPayloadType;
