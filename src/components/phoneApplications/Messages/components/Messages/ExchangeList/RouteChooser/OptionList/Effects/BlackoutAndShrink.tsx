import { FC, useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const BlackoutAndShrink: FC = () => {
  const time = useSharedValue(1);

  useEffect(() => {
    time.value = withSpring(0, { duration: 350 });
  });
  const blackoutAndShrink = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: time.value }],
      opacity: time.value > 0.5 ? 1 : time.value,
      backgroundColor: "black",
      flex: 1,
      height: "100%",
      width: "100%",
      position: "absolute",
      zIndex: 5,
    };
  });
  return <Animated.View style={[blackoutAndShrink]} />;
};
