import { ImageSourcePropType } from "react-native";

export enum NOTIFICATIONS_REDUCER_ACTIONS {
  ADD,
  DELETE,
  RESET,
  UPDATE,
}
export type NotificationDataType = {
  ID: string;
  active?: boolean;
  backgroundColor?: string;
  title: string;
  content: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
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
