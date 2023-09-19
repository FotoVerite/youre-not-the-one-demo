import SlideInTransitionContainer from "@Components/SlideInTransitionContainer";
import { useConversation } from "@Components/phoneApplications/Messages/hooks/useConversation";
import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { ConversationType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { FC, useEffect, useRef, useState } from "react";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import ConversationContainer from "./ConversationContainer";
import Header from "./Header.tsx";

const ConversationShowView: FC<{
  conversation?: ConversationType;
}> = ({ conversation }) => {
  const { width } = useInsetDimensions();
  const [state, dispatch, digestConversation] = useConversation(width);

  useEffect(() => {
    if (conversation) {
      digestConversation(conversation);
    } else {
      dispatch({ type: CONVERSATION_REDUCER_ACTIONS.RESET });
    }
  }, [conversation]);

  // const slideIn = useAnimatedObserver(conversation);
  // const { width, height } = useInsetDimensions();

  // const animatedSlideIn = useAnimatedStyle(() => {
  //   const translateX = interpolate(slideIn.value, [0, 1], [width, 0]);
  //   return { transform: [{ translateX }] };
  // });

  // const headerProps = useMemo(() => {
  //   if (conversation == null) {

  //   }
  // }, [conversation])
  // useEffect(() => {
  //   if (context.newMessage.state) {
  //     shrink.value = withDelay(250, withTiming(1, { duration: 500 }));
  //   } else {
  //     shrink.value = withTiming(0, { duration: 500 });
  //   }
  // }, [context.newMessage.state, shrink]);

  // const AnimateShrink = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: interpolateColor(
  //       shrink.value,
  //       [0, 1],
  //       ["transparent", "#8d8a8a"]
  //     ),
  //     borderTopLeftRadius: interpolate(shrink.value, [0, 1], [0, 10]),
  //     borderTopRightRadius: interpolate(shrink.value, [0, 1], [0, 10]),
  //     transform: [{ scale: interpolate(shrink.value, [0, 1], [1, 0.95]) }],
  //   };
  // }, [context.newMessage.state]);
  return (
    <SlideInTransitionContainer toObserve={state}>
      {state && (
        <>
          <ConversationContainer conversation={state} dispatch={dispatch} />
          <Header
            color={state.interfaceColor}
            name={state?.name}
            visible={0}
            shrink={0}
          />
        </>
      )}
    </SlideInTransitionContainer>
  );
};

export default ConversationShowView;
