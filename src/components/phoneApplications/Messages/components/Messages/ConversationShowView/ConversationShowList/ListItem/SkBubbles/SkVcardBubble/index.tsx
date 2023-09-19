import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
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

import useInitials from "./useInitials";
import { SkBubbleTypeWithGradient } from "../types";
import { useBubbleClip } from "../useBubbleClip";
import { useHeightDeterminedGradient } from "../useHeightDeterminedGradient";

export const SkVcardBubble: FC<SkBubbleTypeWithGradient> = ({
  colors,
  scrollHandler,
  offset,
  content,
  addressee,
  width,
  height,
  isLastInExchange,
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
    isLastInExchange ? 1 : 0,
  );

  const initialsCircle = useInitials(
    width,
    height,
    content as MESSAGE_CONTACT_NAME,
  );

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
