import Notification from "@Components/notifications/Notification";
import {
  NOTIFICATIONS_REDUCER_ACTIONS,
  NotificationType,
  NotificationsReducerActionsType,
} from "@Components/notifications/reducer/types";
import React, { FC, useCallback, useEffect, useRef } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "src/theme";

import defaultImage from "./assets/default.jpeg";
import NotificationSwipe from "../NotificationSwipe";

type PropType = NotificationType & {
  displayIndex: number;
  dispatch: (args: NotificationsReducerActionsType) => void;
};

const NotificationPopup: FC<PropType> = ({
  backgroundColor,
  content,
  displayIndex,
  dispatch,
  image,
  index,
  onPress,
  title,
  updatedAt,
}) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const height = useRef<number>(0);

  const dispatchDeactivation = () => {
    dispatch({
      type: NOTIFICATIONS_REDUCER_ACTIONS.UPDATE,
      payload: { active: false, index },
    });
  };

  const fadeOut = useCallback(() => {
    "worklet";
    opacity.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished) {
        runOnJS(dispatchDeactivation);
      }
    });
  }, [opacity]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runOnUI(fadeOut)();
    }, 5000);
    translateY.value = withTiming(1, { duration: 1000 });
    return () => clearTimeout(timer);
  }, [opacity]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        {
          translateY: interpolate(
            translateY.value,
            [0, 1],
            [-500, 500 + height.current],
          ),
        },
      ],
      opacity: opacity.value,
    };
  }, [opacity, translateX, translateY]);

  return (
    <NotificationSwipe
      translateX={translateX}
      dispatchDeactivation={dispatchDeactivation}
    >
      <Animated.View
        style={[
          styles.notification,
          {
            width: width - theme.spacing.p4,
          },
          animatedContainerStyle,
        ]}
        onLayout={(layout: LayoutChangeEvent) => {
          const itemHeight = layout.nativeEvent.layout.height;
          height.current = itemHeight + displayIndex * 10;
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (onPress) {
              onPress();
            }
          }}
        >
          <Notification
            content={content}
            title={title}
            updatedAt={updatedAt}
            backgroundColor={backgroundColor || theme.colors.muted}
            image={image || defaultImage}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    </NotificationSwipe>
  );
};

export default NotificationPopup;

const styles = StyleSheet.create({
  notification: {
    top: -500,
    position: "absolute",
    left: theme.spacing.p2,
  },
});
