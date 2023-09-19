import { Circle, Group } from "@shopify/react-native-skia";
import React, { FC, useEffect } from "react";
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

export const Dot: FC<{ height: number; width: number; delay: number }> = ({
  delay,
  height,
  width,
}) => {
  const color = useSharedValue(0);

  const blink = withSequence(
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
      () =>
        (color.value = withRepeat(
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
              }),
            ),
          ),
          -1,
        )),
    ),
  );

  const repeatForever = () => {
    "worklet";
    color.value = withDelay(delay, blink);
  };

  useEffect(() => {
    repeatForever();
  }, []);

  const animatedColor = useDerivedValue(() =>
    convertToRGBA(
      interpolateColor(color.value, [0, 1], ["#525252", "#acacac"]),
    ),
  );

  return (
    <Group color={animatedColor}>
      <Circle cx={width} cy={height} r={4} />
    </Group>
  );
};
