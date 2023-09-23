import context from "@Components/notifications/context";
import { ConversationListType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedStyle,
} from "react-native-reanimated";

import Header from "./Header";
import List from "./List";

const ConversationIndexView: FC<{
  shrink: SharedValue<number>;
  conversationShown: SharedValue<number>;
  viewable: ConversationListType[];
}> = ({ conversationShown, shrink, viewable }) => {
  const aref = useAnimatedRef<Animated.FlatList<ConversationListType>>();

  const animatedShrink = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        shrink.value,
        [0, 1],
        ["transparent", "#8d8a8a"]
      ),
      borderTopLeftRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      borderTopRightRadius: interpolate(shrink.value, [0, 1], [0, 10]),
      transform: [{ scale: interpolate(shrink.value, [0, 1], [1, 0.97]) }],
    };
  }, [shrink]);
  const animatedMoveLeft = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: interpolate(conversationShown.value, [0, 1], [0, -100]) },
      ],
    };
  }, [shrink]);

  return (
    <Animated.View style={[styles.screen, animatedShrink, animatedMoveLeft]}>
      <Header />
      <List viewable={viewable} aref={aref} />
    </Animated.View>
  );
};

export default ConversationIndexView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
