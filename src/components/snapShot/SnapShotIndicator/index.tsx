import {
  Blur,
  Canvas,
  Group,
  Image,
  RoundedRect,
  Shadow,
  SkImage,
  rect,
  rrect,
  vec,
} from "@shopify/react-native-skia";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const width = dimensions.width;
  const opacity = useSharedValue(0);
  const scaling = useSharedValue(1);
  const blur = useSharedValue(5);
  const moveOffscreen = useSharedValue(0);

  const shadowBlur = useDerivedValue(() =>
    interpolate(scaling.value, [0.5, 0.2], [0, 5], Extrapolate.CLAMP),
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
    cb: AnimationCallback,
  ) => {
    "worklet";
    scaling.value = withDelay(
      configuration.delayFor,
      withTiming(
        configuration.scaleTo,
        { duration: configuration.duration },
        cb,
      ),
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
      }),
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

  const groupTransform = useDerivedValue(() => {
    return [
      { scale: scaling.value },
      {
        translateX: interpolate(
          moveOffscreen.value,
          [0, 1],
          [0, -width / scaling.value],
        ),
      },
    ];
  });

  return (
    <>
      {snapshot && (
        <Canvas
          style={[
            styles.layout,
            { height: dimensions.height, width: dimensions.width },
          ]}
        >
          <Group
            origin={vec(50, dimensions.height - insets.bottom)}
            transform={groupTransform}
          >
            <RoundedRect
              opacity={opacity}
              x={0}
              y={insets.top}
              r={25}
              width={width}
              height={height}
              color="white"
            />
            <Image
              clip={rrect(
                rect(10, insets.top + 10, width - 20, height - 20),
                25,
                25,
              )}
              fit="fill"
              opacity={opacity}
              image={snapshot}
              x={10}
              y={insets.top + 10}
              width={width - 20}
              height={height - 20}
            >
              <Blur blur={blur} />
            </Image>
            <Shadow dx={0} dy={0} blur={shadowBlur} color="black" />
          </Group>
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
