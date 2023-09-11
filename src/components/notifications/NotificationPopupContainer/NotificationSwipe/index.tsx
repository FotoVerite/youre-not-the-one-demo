import { NotificationsReducerActionsType } from "@Components/notifications/reducer/types";
import React, { FC, PropsWithChildren } from "react";
import { useWindowDimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SharedValue, runOnJS, withTiming } from "react-native-reanimated";
import { theme } from "src/theme";

type PropType = PropsWithChildren & {
  translateX: SharedValue<number>;
  dispatchDeactivation: (arg: NotificationsReducerActionsType) => void;
};

const NotificationSwipe: FC<PropType> = ({
  children,
  dispatchDeactivation,
  translateX,
}) => {
  const { width } = useWindowDimensions();

  return (
    <PanGestureHandler
      activeOffsetX={[-50, 50]}
      onEnded={() => {
        if (Math.abs(translateX.value) >= (width - theme.spacing.p4) / 4) {
          translateX.value = withTiming(
            -width,
            {
              duration: 250,
            },
            () => runOnJS(dispatchDeactivation)
          );
        } else {
          translateX.value = withTiming(0, { duration: 150 });
        }
      }}
      onGestureEvent={(e) => {
        translateX.value = Math.min(0, e.nativeEvent.translationX);
      }}
    >
      {children}
    </PanGestureHandler>
  );
};

export default NotificationSwipe;
