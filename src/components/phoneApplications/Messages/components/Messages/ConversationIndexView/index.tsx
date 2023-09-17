import { ConversationListType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { FC } from "react";
import { Animated, StyleSheet } from "react-native";
import { useAnimatedRef, useSharedValue } from "react-native-reanimated";

import Header from "./Header";
import List from "./List";

const ConversationIndexView: FC<{
  viewable: ConversationListType[];
}> = ({ viewable }) => {
  const shrink = useSharedValue(0);
  const aref = useAnimatedRef<Animated.FlatList<ConversationListType>>();

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
    <Animated.View style={[styles.screen]}>
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
