import {
  Canvas,
  Group,
  Rect,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import { FC, PropsWithChildren, useEffect } from "react";
import { View } from "react-native";

import { SkBubbleTypeWithGradient } from "../types";
import { useBubbleClip } from "../useBubbleClip";
import { useHeightDeterminedGradient } from "../useHeightDeterminedGradient";

export const SkGradientBubbleWrapper: FC<
  SkBubbleTypeWithGradient & PropsWithChildren
> = ({
  children,
  colors,
  height,
  addressee,
  isLastInExchange,
  offset,
  scrollHandler,
  setAsResolved,
  width,
}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    addressee,
    scrollHandler,
  );
  const clipFunction = useBubbleClip(
    width,
    height,
    16,
    addressee,
    isLastInExchange ? 0 : 1,
  );
  useEffect(() => {
    setAsResolved(true);
  }, [setAsResolved]);

  return (
    <View>
      <Canvas
        style={{
          width,
          height,
        }}
      >
        <Group clip={clipFunction}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              colors={computedColors}
              start={vec(0, 0)}
              end={vec(0, height)}
            />
          </Rect>
        </Group>
        {children}
      </Canvas>
    </View>
  );
};
