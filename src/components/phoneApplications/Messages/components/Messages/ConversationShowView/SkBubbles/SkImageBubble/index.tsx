import { DigestedConversationImageItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { useImage, Canvas, Group, Image } from "@shopify/react-native-skia";
import React, { FC } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { useBubbleClip } from "../useBubbleClip";

export const SkImageBubble: FC<DigestedConversationImageItemType> = ({
  content,
  width,
  height,
  leftSide,
  isLastInExchange,
}) => {
  const image = useImage(content);
  const clipFunction = useBubbleClip(
    width,
    height,
    16,
    leftSide,
    isLastInExchange ? 1 : 0
  );

  if (!image) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View>
        <Canvas
          style={[
            {
              width,
              height,
            },
          ]}
        >
          <Group clip={clipFunction}>
            <Image
              image={image}
              fit="fill"
              x={0}
              y={0}
              width={width}
              height={height}
            />
          </Group>
        </Canvas>
      </View>
    </TouchableWithoutFeedback>
  );
};
