import {
  OPTION_EFFECT_TYPE,
  OptionTypeWithDisplayEffect,
} from "@Components/phoneApplications/Messages/hooks/routes/types";
import React, { FC, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSound } from "src/utility/useSound";

import BaseOption from "./BaseOption";
import { DisplayEffectOptionLabelType } from "./type";

const checkSelected = (arr: string[], target: string[]) =>
  target.every((v) => arr.includes(v));

const OptionWithDisplayEffect: FC<DisplayEffectOptionLabelType> = ({
  cb,
  id,
  option,
  setHeight,
  selected,
}) => {
  const height = useSharedValue(0);

  useEffect(() => {
    setHeight((s) => s.concat(height));
  }, [height, setHeight]);

  useEffect(() => {
    const hasSelectedAllOtherOptions = checkSelected(selected, option.data);
    if (hasSelectedAllOtherOptions) {
      height.value = withDelay(
        1000,
        withSequence(
          withTiming(20),
          withTiming(0),
          withTiming(30, { duration: 500 }),
          withTiming(0, { duration: 200 }),
          withTiming(30, { duration: 500 }),
          withTiming(0),
          withSpring(30),
          withSpring(75, { duration: 500 }),
          withSpring(50, { duration: 1500 })
        )
      );
    }
  }, [selected, option.data, height]);

  return (
    <Animated.View style={[{ height }]}>
      <TouchableOpacity
        onPress={() => {
          cb(option.value);
        }}
      >
        <BaseOption value={option.value} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default OptionWithDisplayEffect;
