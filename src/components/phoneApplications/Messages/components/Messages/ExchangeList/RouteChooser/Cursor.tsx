import React, { FC, useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const Cursor: FC = () => {
  const shared = useSharedValue(-0.2);

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, [shared]);

  const blinkEffect = useAnimatedStyle(() => {
    return {
      opacity: shared.value,
    };
  });

  return <Animated.Text style={[styles.cursor, blinkEffect]}>|</Animated.Text>;
};

export default Cursor;

const styles = StyleSheet.create({
  cursor: {
    marginTop: -5,
    color: "blue",
    fontSize: 24,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "SourceSansProBold",
  },
});
