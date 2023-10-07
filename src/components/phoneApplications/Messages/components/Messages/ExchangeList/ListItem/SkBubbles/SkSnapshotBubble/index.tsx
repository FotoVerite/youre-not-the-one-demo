import {
  MediaImageElement,
  useMediaContext,
} from "@Components/phoneApplications/Messages/context/Media";
import { ImageDigestionPropsType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { Canvas, Group, Image as SkiaImage } from "@shopify/react-native-skia";
import React, { FC, useEffect } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { useSnapshotResolver } from "./useResolveSnapshot";
import { SkBubbleType } from "../types";
import { useBubbleClip } from "../useBubbleClip";

export const SkSnapshotBubble: FC<
  Omit<SkBubbleType, "content"> & { content: ImageDigestionPropsType }
> = ({
  ID,
  content,
  dispatch,
  height,
  addressee,
  isLastInExchange,
  setAsResolved,
  width,
}) => {
  const { image } = content;
  useSnapshotResolver(content, dispatch, ID, width);
  const setMedia = useMediaContext().setMedia;
  const clipFunction = useBubbleClip(
    width,
    height,
    16,
    addressee,
    isLastInExchange ? 0 : 1
  );

  useEffect(() => {
    if (image) {
      setAsResolved(true);
    }
  }, [image, setAsResolved]);

  if (image == null) {
    return;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setMedia(
          <MediaImageElement
            source={{
              uri: "data:image/png;base64," + image.encodeToBase64(),
            }}
            aspectRatio={width / height}
          />
        );
      }}
    >
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
              image={image}
              fit="fitWidth"
              x={0}
              y={0}
              width={width - 12}
              height={height}
            />
          </Group>
        </Canvas>
      </View>
    </TouchableWithoutFeedback>
  );
};
