import { duration } from "moment";
import React, { FC, useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "src/theme";

export const ReadLabel: FC<{ content: string; height: number }> = ({
  height,
  content,
}) => {
  const animatedHeight = useSharedValue(height);
  const initialHeight = useRef(height);
  useEffect(() => {
    animatedHeight.value = withTiming(height, { duration: 400 });
  }, [height]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      opacity: interpolate(height, [initialHeight.current, 0], [1, 0]),
    };
  }, [height]);
  return (
    <Animated.View style={animatedStyle}>
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
    paddingEnd: theme.spacing.p2,
  },
});
