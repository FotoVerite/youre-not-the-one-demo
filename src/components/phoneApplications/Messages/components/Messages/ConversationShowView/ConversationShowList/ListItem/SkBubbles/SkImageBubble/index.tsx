import { useImage, Canvas, Group, Image } from "@shopify/react-native-skia";
import React, { FC } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { SkBubbleType } from "../types";
import { useBubbleClip } from "../useBubbleClip";

export const SkImageBubble: FC<SkBubbleType> = ({
  content,
  width,
  height,
  addressee,
  isLastInExchange,
}) => {
  const image = useImage(content as string);
  const clipFunction = useBubbleClip(
    width,
    height,
    16,
    addressee,
    isLastInExchange ? 0 : 1,
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
