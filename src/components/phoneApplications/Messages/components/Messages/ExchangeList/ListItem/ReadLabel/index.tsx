import React, { FC, useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export const ReadLabel: FC<{
  content: string;
  height: number;
  contentDelay?: number;
}> = ({ height, content, contentDelay }) => {
  const animatedHeight = useSharedValue(height);
  const fadeIn = useSharedValue(contentDelay ? 0 : 1);
  const initialHeight = useRef(height);
  useEffect(() => {
    animatedHeight.value = withTiming(height, { duration: 400 });
  }, [animatedHeight, height]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      opacity: interpolate(height, [initialHeight.current, 0], [1, 0]),
    };
  }, [height]);

  useEffect(() => {
    if (contentDelay) {
      fadeIn.value = withDelay(
        contentDelay || 250,
        withTiming(1, { duration: 250 }),
      );
    }
  }, [contentDelay, fadeIn]);
  return (
    <Animated.View style={[{ opacity: fadeIn }, animatedStyle]}>
      <Text style={[styles.text]}>{content}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  time: {
    margin: 0,
    marginTop: 0,
  },
  text: {
    fontSize: 10,
    textAlign: "right",
    paddingEnd: 2,
  },
});
