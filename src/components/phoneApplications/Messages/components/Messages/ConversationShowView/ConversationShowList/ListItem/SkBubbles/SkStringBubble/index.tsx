import {
  Canvas,
  Group,
  Rect,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import { FC, ReactNode } from "react";

import { SkBubbleTypeWithGradient } from "../types";
import { useBubbleClip } from "../useBubbleClip";
import { useHeightDeterminedGradient } from "../useHeightDeterminedGradient";

export const SkStringBubble: FC<SkBubbleTypeWithGradient> = ({
  colors,
  scrollHandler,
  offset,
  content,
  addressee,
  width,
  height,
  effect,
  isLastInExchange,
}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    addressee,
    scrollHandler
  );

  const clipFunction = useBubbleClip(
    width,
    height,
    16,
    addressee,
    isLastInExchange ? 0 : 1
  );
  //const glitchEffect = useGlitchEffect(height, width, content, clip);
  return (
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
      <Group color="white">{content as ReactNode[]}</Group>
      {/* {effect?.type === EFFECT_TYPE.GLITCH && glitchEffect} */}
    </Canvas>
  );
};
