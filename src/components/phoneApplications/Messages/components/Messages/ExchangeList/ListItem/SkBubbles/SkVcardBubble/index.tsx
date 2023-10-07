import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import { FC } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import useInitials from "./useInitials";
import { SkGradientBubbleWrapper } from "../SkGradientBubbleWrapper";
import { SkBubbleTypeWithGradient } from "../types";

export const SkVcardBubble: FC<SkBubbleTypeWithGradient> = (props) => {
  const initialsCircle = useInitials(
    props.width,
    props.height,
    props.content as MESSAGE_CONTACT_NAME,
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.SHOW, {
          name: props.content as MESSAGE_CONTACT_NAME,
          type: "new",
        });
      }}
    >
      <SkGradientBubbleWrapper {...props}>
        {initialsCircle}
      </SkGradientBubbleWrapper>
    </TouchableWithoutFeedback>
  );
};
