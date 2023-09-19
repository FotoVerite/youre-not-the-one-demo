import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { delayFor } from "src/utility/async";

import { WaitingBubble } from "./WaitingBubble";
import ListOffsetEmitter, { LIST_EMITTER_EVENTS } from "../../emitters";
import { ConversationShowBubbleItem } from "../types";

export const TypingContainer: FC<
  ConversationShowBubbleItem & {
    dispatch: (action: ConversationReducerActionsType) => void;
  } & PropsWithChildren
> = (props) => {
  const containerOpacity = useSharedValue(props.contentDelay ? 0 : 1);
  const opacity = useSharedValue(props.contentDelay ? 1 : 0);

  const containerOpacityAnimation = useAnimatedStyle(() => {
    return { opacity: containerOpacity.value };
  });
  const waitingOpacity = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const textOpacity = useAnimatedStyle(() => {
    return { opacity: interpolate(opacity.value, [1, 0], [0, 1]) };
  });

  const continueRoute = async (delay: number) => {
    ListOffsetEmitter.emit(LIST_EMITTER_EVENTS.ADD_TO_OFFSET, props.height);
    await delayFor(delay);
    props.dispatch({ type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE });
  };

  useEffect(() => {
    const showTyping = async (delay?: number) => {
      await delayFor(10);
      ListOffsetEmitter.emit(LIST_EMITTER_EVENTS.ADD_TO_OFFSET, 45);
      containerOpacity.value = withTiming(1, { duration: 200 });
      opacity.value = withDelay(
        1350 + (delay || 0),
        withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            runOnJS(continueRoute)(props.contentDelay || 0);
          }
        }),
      );
    };

    if (props.contentDelay) {
      showTyping(props.typingDelay);
    }
  }, [containerOpacity, opacity, props.typingDelay]);

  return (
    <Animated.View
      style={[
        { height: props.height + props.paddingBottom },
        containerOpacityAnimation,
      ]}
    >
      <Animated.View style={[styles.waiting, waitingOpacity]}>
        <WaitingBubble {...props} />
      </Animated.View>
      <Animated.View style={[styles.main, textOpacity]}>
        {props.children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  waiting: {
    position: "absolute",
  },
  main: {},
});
