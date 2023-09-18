import SlideInTransitionContainer from "@Components/SlideInTransitionContainer";
import { ConversationType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { FC } from "react";
import { theme } from "src/theme";

import ConversationContainer from "./ConversationContainer";
import Header from "./Header.tsx";

const ConversationShowView: FC<{
  conversation?: ConversationType;
}> = ({ conversation }) => {
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
    <SlideInTransitionContainer
      toObserve={conversation}
      viewOverrides={{ backgroundColor: theme.colors.muted }}
    >
      {conversation && (
        <>
          <Header
            color={conversation.interfaceColor}
            name={conversation?.name}
            visible={0}
            shrink={0}
          />
          <ConversationContainer conversation={conversation} />
        </>
      )}
    </SlideInTransitionContainer>
  );
};

export default ConversationShowView;
