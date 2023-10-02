import {
  BubbleItemType,
  DigestedConversationListItem,
} from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import React, { FC } from "react";
import { View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";

import { Dot } from "./Dot";
import { useBubbleCloudClip } from "./useBubbleCloudClip";
import { ExchangeWrapper } from "../ExchangeWrapper";
import { useHeightDeterminedGradient } from "../SkBubbles/useHeightDeterminedGradient";

export const WaitingBubble: FC<
  BubbleItemType & {
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.FlatList<DigestedConversationListItem>>;
  }
> = (props) => {
  const width = 75;
  const height = 36;
  const clip = useBubbleCloudClip(width, height, 16);
  const computedColors = useHeightDeterminedGradient(
    props.colors,
    props.offset,
    true,
    props.scrollHandler,
  );

  const dotHeight = (height - 2.5) / 2;

  return (
    <ExchangeWrapper
      addressee
      alignItems="flex-start"
      colors={props.colors}
      height={width}
      name={props.name}
      paddingBottom={props.paddingBottom}
    >
      <View>
        <Canvas
          style={{
            width,
            height,
          }}
        >
          <Group clip={clip}>
            <Rect x={0} y={0} width={width} height={width}>
              <LinearGradient
                colors={computedColors}
                start={vec(0, 0)}
                end={vec(0, height)}
              />
            </Rect>
            <Group>
              <Dot height={dotHeight} width={28} delay={0} />
              <Dot height={dotHeight} width={(width + 12) / 2} delay={500} />
              <Dot height={dotHeight} width={width - 15} delay={1000} />
            </Group>
          </Group>
        </Canvas>
      </View>
    </ExchangeWrapper>
  );
};
