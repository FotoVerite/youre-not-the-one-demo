import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Z_INDEX } from "src/constants/zIndex";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import NotificationPopup from "./NotificationPopup";
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
