import { DigestedConversationVCardItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import {
  Canvas,
  Group,
  Rect,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import { FC } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";

import useInitials from "./useInitials";
import { useBubbleClip } from "../useBubbleClip";
import { useHeightDeterminedGradient } from "../useHeightDeterminedGradient";

export const SkVcardBubble: FC<
  DigestedConversationVCardItemType & {
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
  paddingBottom,
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

  const initialsCircle = useInitials(width, height, content, paddingBottom);

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
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
          {initialsCircle}
        </Canvas>
      </View>
    </TouchableWithoutFeedback>
  );
};
