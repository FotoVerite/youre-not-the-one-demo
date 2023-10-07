import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export enum MESSAGE_SEND_BUTTON_STATE {
  INACTIVE,
  HAS_CONTENT,
  OPEN,
  SENDABLE,
  WAITING,
}

export const ChevronButton: FC<{
  state: MESSAGE_SEND_BUTTON_STATE;
}> = ({ state }) => {
  const startingValues = {
    [MESSAGE_SEND_BUTTON_STATE.INACTIVE]: {
      active: 0,
      sendable: 0,
      chevron: 0,
    },
    [MESSAGE_SEND_BUTTON_STATE.HAS_CONTENT]: {
      active: 0,
      sendable: 0,
      chevron: 0,
    },
    [MESSAGE_SEND_BUTTON_STATE.OPEN]: { active: 1, sendable: 0, chevron: 1 },
    [MESSAGE_SEND_BUTTON_STATE.SENDABLE]: {
      active: 1,
      sendable: 1,
      chevron: 2,
    },
    [MESSAGE_SEND_BUTTON_STATE.WAITING]: { active: 1, sendable: 2, chevron: 2 },
  };
  const buttonActive = useSharedValue(startingValues[state].active);
  const buttonSendable = useSharedValue(startingValues[state].sendable);
  const chevronState = useSharedValue(startingValues[state].chevron);

  useEffect(() => {
    switch (state) {
      case MESSAGE_SEND_BUTTON_STATE.HAS_CONTENT:
        buttonActive.value = withTiming(0);
        buttonSendable.value = withTiming(0);
        chevronState.value = withRepeat(
          withSequence(
            withTiming(0.8, { duration: 1000, easing: Easing.bounce }),
            withTiming(0, { duration: 750, easing: Easing.bounce }),
          ),
          -1,
          true,
        );
        break;
      case MESSAGE_SEND_BUTTON_STATE.OPEN:
        buttonActive.value = withTiming(1);
        buttonSendable.value = withTiming(0);
        chevronState.value = withTiming(1);
        break;
      case MESSAGE_SEND_BUTTON_STATE.SENDABLE:
        buttonActive.value = withTiming(1);
        buttonSendable.value = withTiming(1);
        chevronState.value = withTiming(2);
        break;
      case MESSAGE_SEND_BUTTON_STATE.WAITING:
        buttonActive.value = withTiming(1);
        buttonSendable.value = withTiming(2);
        chevronState.value = withTiming(2);
        break;
      case MESSAGE_SEND_BUTTON_STATE.INACTIVE:
        buttonActive.value = withTiming(0);
        buttonSendable.value = withTiming(0);
        chevronState.value = withTiming(0);
        break;
    }
  }, [buttonActive, buttonSendable, chevronState, state]);

  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        buttonSendable.value,
        [0, 1, 2],
        ["transparent", "purple", "black"],
      ),
      transform: [
        {
          rotate: `${interpolate(buttonActive.value, [0, 1], [0, -180])}deg`,
        },
      ],
    };
  }, [buttonActive]);

  const chevronAnimatedStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        chevronState.value,
        [0, 1, 2],
        ["black", "purple", "white"],
      ),
    };
  }, [buttonActive]);
  const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

  return (
    <Animated.View style={[styles.iconContainer, containerAnimatedStyles]}>
      <AnimatedIcon
        size={20}
        name="chevron-down"
        style={[styles.icon, chevronAnimatedStyles]}
        color="black"
      />
    </Animated.View>
  );
};

export default ChevronButton;

const styles = StyleSheet.create({
  iconContainer: {
    flexShrink: 1,
    marginTop: "auto",
    height: 30,
    width: 30,
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 2,
  },
  icon: {
    textAlign: "center",
    marginBottom: 4,
  },
});
