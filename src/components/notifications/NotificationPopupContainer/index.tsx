import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Z_INDEX } from "src/constants/zIndex";
import { theme } from "src/theme";

import { useInsetDimensions } from "src/utility/useInsetDimensions";
import NotificationPopup from "./NotificationPopup";
import { NotificationsContext, useNotificationContext } from "../context";
import {
  NotificationType,
  NotificationsReducerActionsType,
} from "../reducer/types";

const NotificationPopupContainer: FC<{
  notifications: NotificationType[];
  dispatch: (args: NotificationsReducerActionsType) => void;
}> = ({ notifications, dispatch }) => {
  const { width, height } = useInsetDimensions();
  const activeNotifications = useMemo(() => {
    return notifications.filter((notification) => notification.active);
  }, [notifications]);
  console.log(activeNotifications.length);
  return (
    <View pointerEvents="box-none" style={[styles.screen, { width, height }]}>
      {activeNotifications.map((notification, idx) => (
        <NotificationPopup
          {...notification}
          key={`${notification.title}-${notification.index}`}
          displayIndex={idx}
          dispatch={dispatch}
        />
      ))}
    </View>
  );
};

export default NotificationPopupContainer;

const styles = StyleSheet.create({
  screen: {
    position: "absolute",
    zIndex: Z_INDEX.NOTIFICATION_POPUP,
  },
});
