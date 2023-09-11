import { DigestedConversationStringItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { FC } from "react";
import Animated, { SharedValue } from "react-native-reanimated";

import { SkStringBubble } from "..";
import { useFonts } from "src/contexts/fonts/hooks/useFonts";
import { GetDimensionsAndSkiaNodes } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/SkFunctions/skiaCalculations";

export type SkStringWrapperType = Omit<
  DigestedConversationStringItemType,
  "content" | "height" | "width"
> & {
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  content: string;
};
export const SkStringBubbleWrapper: FC<SkStringWrapperType> = (props) => {
  const fonts = useFonts();

  if (!fonts?.HelveticaNeue) {
    return null;
  }

  const [boxHeight, boxWidth, textNodes, cursorVector] =
    GetDimensionsAndSkiaNodes(
      fonts?.HelveticaNeue,
      fonts?.SFPro,
      props.content,
      400,
      props.leftSide
    );
  return (
    <SkStringBubble
      {...props}
      content={textNodes}
      height={boxHeight + 18}
      width={boxWidth}
    />
  );
};
