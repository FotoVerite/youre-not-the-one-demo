import React, { FC, PropsWithChildren } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SharedValue, withTiming } from "react-native-reanimated";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

const TimeStampPan: FC<
  PropsWithChildren & { translateX: SharedValue<number> }
> = ({ children, translateX }) => {
  const { width } = useInsetDimensions();

  const panGesture = Gesture.Pan()
    .activeOffsetX(-50)
    .onBegin(() => {})
    .onUpdate((e) => {
      translateX.value = Math.min(1, -(e.translationX / (width / 4)));
    })
    .onEnd(() => {
      translateX.value = withTiming(0);
    })
    .onFinalize(() => {});

  const nativeGesture = Gesture.Native();

  const composedGestures = Gesture.Simultaneous(panGesture, nativeGesture);

  return (
    <GestureDetector gesture={composedGestures}>{children}</GestureDetector>
  );
};

export default TimeStampPan;
