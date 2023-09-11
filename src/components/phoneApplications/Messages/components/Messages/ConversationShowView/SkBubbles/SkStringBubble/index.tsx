import { EFFECT_TYPE } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { DigestedConversationStringItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import {
  Canvas,
  Group,
  Rect,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import { FC } from "react";
import Animated, { SharedValue } from "react-native-reanimated";

import { useBubbleClip } from "../useBubbleClip";
import { useHeightDeterminedGradient } from "../useHeightDeterminedGradient";

export const SkStringBubble: FC<
  DigestedConversationStringItemType & {
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
  }
> = ({
  colors,
  scrollHandler,
  offset,
  content,
  leftSide,
  width,
  height,
  effect,
  isLastInExchange,
}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    leftSide,
    scrollHandler
  );

  const clipFunction = useBubbleClip(
    width,
    height,
    16,
    leftSide,
    isLastInExchange ? 1 : 0
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
      <Group color="white">{content}</Group>
      {/* {effect?.type === EFFECT_TYPE.GLITCH && glitchEffect} */}
    </Canvas>
  );
};
