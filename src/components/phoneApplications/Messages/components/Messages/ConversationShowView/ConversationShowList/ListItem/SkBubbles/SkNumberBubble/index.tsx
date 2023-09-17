import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { FC } from "react";
import { TouchableWithoutFeedback } from "react-native";

import useNumber from "./useNumber";
import { SkGradientBubbleWrapper } from "../SkGradientBubbleWrapper";
import { SkBubbleTypeWithGradient } from "../types";

export const SkNumberBubble: FC<SkBubbleTypeWithGradient> = (props) => {
  const number = useNumber(props.height, props.content as MESSAGE_CONTACT_NAME);

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <SkGradientBubbleWrapper {...props}>{number}</SkGradientBubbleWrapper>
    </TouchableWithoutFeedback>
  );
};
