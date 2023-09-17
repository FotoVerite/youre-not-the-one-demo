import {
  Canvas,
  Group,
  Image as SkiaImage,
  SkImage,
} from "@shopify/react-native-skia";
import React, { FC } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";

import { SkBubbleType } from "../types";
import { useBubbleClip } from "../useBubbleClip";

export const SkSnapshotBubble: FC<SkBubbleType> = ({
  content,
  height,
  addressee,
  isLastInExchange,
  width,
}) => {
  const clipFunction = useBubbleClip(
    width,
    height,
    16,
    addressee,
    isLastInExchange ? 1 : 0
  );

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
            <SkiaImage
              image={content as unknown as SkImage}
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
