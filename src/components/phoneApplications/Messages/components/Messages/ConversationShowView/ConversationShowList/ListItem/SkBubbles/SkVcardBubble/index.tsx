import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { FC } from "react";
import { TouchableWithoutFeedback } from "react-native";

import useInitials from "./useInitials";
import { SkGradientBubbleWrapper } from "../SkGradientBubbleWrapper";
import { SkBubbleTypeWithGradient } from "../types";

export const SkVcardBubble: FC<SkBubbleTypeWithGradient> = (props) => {
  const initialsCircle = useInitials(
    props.width,
    props.height,
    props.content as MESSAGE_CONTACT_NAME
  );

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <SkGradientBubbleWrapper {...props}>
        {initialsCircle}
      </SkGradientBubbleWrapper>
    </TouchableWithoutFeedback>
  );
};
