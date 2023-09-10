import {
  Blur,
  Canvas,
  Image,
  RoundedRect,
  Shadow,
  SkImage,
} from "@shopify/react-native-skia";
import React, { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SnapShotContext, useSnapshotContext } from "../context";
import {
  AnimationCallback,
  Extrapolate,
  interpolate,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { delayFor } from "src/utility/async";
import { SNAPSHOT_TYPES, SnapShotImageType } from "../context/type";

const SnapshotIndicator: FC<{
  image: SnapShotImageType;
  setImage: (args: SnapShotImageType) => void;
}> = ({ image, setImage }) => {
  const [snapshot, setSnapshot] = useState<SkImage>();

  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const height = dimensions.height - insets.top - insets.bottom;

  const opacity = useSharedValue(0);
  const scaling = useSharedValue(1);
  const blur = useSharedValue(5);
  const moveOffscreen = useSharedValue(0);

  const animatedHeight = useDerivedValue(() => height * scaling.value);

  const animatedWidth = useDerivedValue(
    () => (dimensions.width - 50) * scaling.value
  );
  const reactAnimatedWidth = useDerivedValue(
    () => dimensions.width * scaling.value
  );
  const reactAnimatedY = useDerivedValue(() => height - animatedHeight.value);
  const rectOffset = useDerivedValue(
    () =>
      interpolate(scaling.value, [1, 0.2], [0, 20]).valueOf() -
      interpolate(
        moveOffscreen.value,
        [0, 1],
        [0, reactAnimatedWidth.value + 20]
      )
  );
  const shadowBlur = useDerivedValue(() =>
    interpolate(scaling.value, [0.5, 0.2], [0, 5], Extrapolate.CLAMP)
  );
  const imageXOffset = useDerivedValue(
    () =>
      (reactAnimatedWidth.value - animatedWidth.value) / 2 + rectOffset.value
  );

  const resetSnapshot = async () => {
    await delayFor(200);
    setSnapshot(undefined);
    setImage(undefined);
    opacity.value = 0;
    scaling.value = 1;
    blur.value = 5;
    moveOffscreen.value = 0;
  };

  const scaleDownTo = (
    configuration: {
      delayFor: number;
      scaleTo: number;
      duration: number;
    },
    cb: AnimationCallback
  ) => {
    "worklet";
    scaling.value = withDelay(
      configuration.delayFor,
      withTiming(
        configuration.scaleTo,
        { duration: configuration.duration },
        cb
      )
    );
  };

  const blurImage = (duration: number, cb: AnimationCallback) => {
    "worklet";
    blur.value = withTiming(0, { duration: duration || 500 }, cb);
  };

  const moveImageOffscreen = () => {
    "worklet";
    moveOffscreen.value = withDelay(
      500,
      withTiming(1, {}, () => {
        runOnJS(resetSnapshot)();
      })
    );
  };

  useEffect(() => {
    if (image && image.type === SNAPSHOT_TYPES.INDICATOR_RUNNING) {
      setSnapshot(image.uri);
    }
  }, [image]);

  useEffect(() => {
    if (snapshot) {
      opacity.value = withTiming(1, { duration: 250 }, () => {
        scaleDownTo({ delayFor: 500, scaleTo: 0.25, duration: 1200 }, () => {
          blurImage(500, moveImageOffscreen);
        });
      });
    }
  }, [snapshot]);

  return (
    <>
      {snapshot && (
        <Canvas
          style={[
            styles.layout,
            { height: dimensions.height, width: dimensions.width },
          ]}
        >
          <RoundedRect
            opacity={opacity}
            x={rectOffset}
            y={reactAnimatedY}
            r={10}
            height={animatedHeight}
            width={reactAnimatedWidth}
            color={"white"}
          >
            <Shadow dx={0} dy={0} blur={shadowBlur} color="black" />
          </RoundedRect>
          <Image
            fit={"scaleDown"}
            opacity={opacity}
            image={snapshot}
            x={imageXOffset}
            y={reactAnimatedY}
            height={animatedHeight}
            width={animatedWidth}
          >
            <Blur blur={blur} />
          </Image>
        </Canvas>
      )}
    </>
  );
};

export default SnapshotIndicator;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    position: "absolute",
    zIndex: 100,
    left: 0,
  },
});
