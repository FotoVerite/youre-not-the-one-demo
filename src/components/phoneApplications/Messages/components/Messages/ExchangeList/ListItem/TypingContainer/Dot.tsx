import { Circle, Group } from "@shopify/react-native-skia";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import {
  Easing,
  convertToRGBA,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const repeatBlink = withRepeat(
  withDelay(
    1000,
    withSequence(
      withTiming(1, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming(0, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      })
    )
  ),
  -1
);

export const Dot: FC<{ height: number; width: number; delay: number }> = ({
  delay,
  height,
  width,
}) => {
  const color = useSharedValue(0);

  const blink = useMemo(() => {
    return withSequence(
      withTiming(1, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming(
        0,
        {
          duration: 250,
          easing: Easing.inOut(Easing.ease),
        },
        () => (color.value = repeatBlink)
      )
    );
  }, [color]);

  useEffect(() => {
    color.value = withDelay(delay, blink);
  }, [color, delay, blink]);

  const animatedColor = useDerivedValue(() =>
    convertToRGBA(interpolateColor(color.value, [0, 1], ["#525252", "#acacac"]))
  );

  return (
    <Group color={animatedColor}>
      <Circle cx={width} cy={height} r={4} />
    </Group>
  );
};
