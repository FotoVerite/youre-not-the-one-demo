import { DigestedConversationListItem } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationListType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import React, { FC, RefObject, useCallback, useMemo } from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";

import ListItem from "./ListItem";
import { ConversationShowListItem } from "./ListItem/types";

function ListHeader() {
  return <View style={{ height: 50 }} />;
}
const renderItem: ListRenderItem<ConversationShowListItem> = ({ item }) => (
  <ListItem {...item} />
);

const getItemLayout = (
  data: ArrayLike<ConversationShowListItem> | null | undefined,
  index: number
) => ({
  length: data ? data[index].height + data[index].paddingBottom : 0,
  offset: data ? data[index].offset : 0,
  index,
});

const ConversationList: FC<{
  exchanges: DigestedConversationListItem[];
}> = ({ exchanges }) => {
  const scrollRef = useAnimatedRef<Animated.FlatList<any>>();
  const scrollHandler = useScrollViewOffset(scrollRef as any);

  const data = useMemo(() => {
    return exchanges.map((item) => {
      return {
        ...item,
        ...{ scrollRef, scrollHandler },
      } as ConversationShowListItem;
    });
  }, [exchanges, scrollHandler, scrollRef]);

  return (
    <Animated.FlatList
      ref={scrollRef}
      style={styles.list}
      data={data}
      ListHeaderComponent={ListHeader}
      renderItem={renderItem}
      scrollEventThrottle={16}
      getItemLayout={getItemLayout}
    />
  );
};

export default ConversationList;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    flex: 1,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: "gray",
  },

  list: {
    flexGrow: 1,
  },
});
