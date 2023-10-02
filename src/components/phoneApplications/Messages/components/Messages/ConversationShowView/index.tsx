import SlideInTransitionContainer from "@Components/SlideInTransitionContainer";
import { useConversation } from "@Components/phoneApplications/Messages/hooks/useConversation";
import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { ConversationType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { FC, useEffect } from "react";
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import ConversationContainer from "./ConversationContainer";
import Header from "./Header.tsx";

const ConversationShowView: FC<{
  conversation?: ConversationType;
  shrink: SharedValue<number>;
  conversationShown: SharedValue<number>;
}> = ({ conversation, conversationShown, shrink }) => {
  const { width } = useInsetDimensions();
  const [state, dispatch, digestConversation] = useConversation(width);

  useEffect(() => {
    if (conversation == null) {
      dispatch({ type: CONVERSATION_REDUCER_ACTIONS.RESET });
    } else if (!state || state.name !== conversation.name) {
      digestConversation(conversation);
    }
  }, [conversation, digestConversation, dispatch, state]);

  const animatedShrink = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        shrink.value,
        [0, 1],
        ["transparent", "#8d8a8a"],
      ),
      borderTopLeftRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      borderTopRightRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      transform: [{ scale: interpolate(shrink.value, [0, 1], [1, 0.97]) }],
    };
  }, [shrink]);
  return (
    <SlideInTransitionContainer toObserve={state} resolver={conversationShown}>
      {state && (
        <Animated.View style={[{ flex: 1 }, animatedShrink]}>
          <ConversationContainer conversation={state} dispatch={dispatch} />
          <Header
            color={state.interfaceColor}
            name={state?.name}
            shrink={shrink}
          />
        </Animated.View>
      )}
    </SlideInTransitionContainer>
  );
};

export default ConversationShowView;
