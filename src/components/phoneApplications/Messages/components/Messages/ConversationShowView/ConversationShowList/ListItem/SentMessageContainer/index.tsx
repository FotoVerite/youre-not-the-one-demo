import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { FC, PropsWithChildren, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { delayFor } from "src/utility/async";

import ListOffsetEmitter, { LIST_EMITTER_EVENTS } from "../../emitters";
import { SentMessageContainerType } from "../types";

const SentMessageContainer: FC<
  SentMessageContainerType & PropsWithChildren
> = ({ dispatch, children, contentDelay, height }) => {
  const opacity = useSharedValue(contentDelay ? 0 : 1);
  const fadeInAnimation = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const continueRoute = async (delay: number) => {
    await delayFor(10);
    ListOffsetEmitter.emit(LIST_EMITTER_EVENTS.ADD_TO_OFFSET, height + 30);
    await delayFor(delay);
    dispatch({ type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE });
  };

  useEffect(() => {
    if (contentDelay) {
      opacity.value = withTiming(1);
      continueRoute(contentDelay + 250);
    }
  }, [contentDelay]);

  return (
    <Animated.View style={[fadeInAnimation, { height }]}>
      {children}
    </Animated.View>
  );
};

export default SentMessageContainer;
