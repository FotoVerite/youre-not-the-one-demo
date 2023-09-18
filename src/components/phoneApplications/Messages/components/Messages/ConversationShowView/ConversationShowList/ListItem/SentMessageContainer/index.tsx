import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import { FC, PropsWithChildren, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { delayFor } from "src/utility/async";

const SentMessageContainer: FC<
  { contentDelay: number } & PropsWithChildren
> = ({ children, contentDelay }) => {
  const opacity = useSharedValue(0);
  const fadeInAnimation = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const continueRoute = async (delay: number) => {
    await delayFor(delay);
    ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.CONTINUE, {
      name: "any",
    });
  };

  useEffect(() => {
    opacity.value = withTiming(1);
    continueRoute(contentDelay + 250);
  }, []);

  return <Animated.View style={[fadeInAnimation]}>{children}</Animated.View>;
};

export default SentMessageContainer;
