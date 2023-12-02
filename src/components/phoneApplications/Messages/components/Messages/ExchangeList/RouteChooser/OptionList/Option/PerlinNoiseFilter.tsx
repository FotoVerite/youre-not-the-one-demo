import { DisplacementMap, Turbulence } from "@shopify/react-native-skia";
import { FC, useEffect } from "react";
import {
  interpolate,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const PerlinNoiseFilter: FC<{}> = (props) => {
  const timer = useSharedValue(5);

  useEffect(() => {
    timer.value = withRepeat(withTiming(15, { duration: 2500 }), -1, true);
  }, []);

  return (
    <DisplacementMap channelX="g" channelY="a" scale={timer}>
      <Turbulence freqX={0.01} freqY={0.05} octaves={10} seed={2} />
    </DisplacementMap>
  );
};
