import { Group } from "@shopify/react-native-skia";
import { FC, ReactNode } from "react";

import { SkGradientBubbleWrapper } from "../SkGradientBubbleWrapper";
import { SkBubbleTypeWithGradient } from "../types";

export const SkStringBubble: FC<SkBubbleTypeWithGradient> = (props) => {
  //const glitchEffect = useGlitchEffect(height, width, content, clip);

  return (
    <SkGradientBubbleWrapper {...props}>
      <Group color="white">{props.content as ReactNode[]}</Group>
      {/* {effect?.type === EFFECT_TYPE.GLITCH && glitchEffect} */}
    </SkGradientBubbleWrapper>
  );
};
