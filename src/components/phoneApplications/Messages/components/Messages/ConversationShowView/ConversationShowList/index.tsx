import { DigestedConversationListItem } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationReducerActionsType } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { ConversationListType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import React, { FC, RefObject, useCallback, useEffect, useMemo } from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";
import { theme } from "src/theme";

import Footer from "./Footer";
import ListItem from "./ListItem";
import { ConversationShowListItem } from "./ListItem/types";
import ListOffsetEmitter, { LIST_EMITTER_EVENTS } from "./emitters";

function ListHeader() {
  return <View style={{ height: 50 }} />;
}

function ListFooter() {
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

const keyExtractor = (item: DigestedConversationListItem, index: number) =>
  index + `-conversation-${item.ID}`;

const ConversationList: FC<{
  exchanges: DigestedConversationListItem[];
  height?: number;
  dispatch: (action: ConversationReducerActionsType) => void;
}> = ({ dispatch, height, exchanges }) => {
  const scrollRef = useAnimatedRef<Animated.FlatList<any>>();
  const scrollHandler = useScrollViewOffset(scrollRef as any);

  const data = useMemo(() => {
    return exchanges.map((item) => {
      return {
        ...item,
        ...{ scrollRef, scrollHandler, dispatch },
      } as ConversationShowListItem;
    });
  }, [exchanges, dispatch, scrollHandler, scrollRef]);

  const footerHeight = useSharedValue(0);

  const memoizedHeader = useMemo(() => {
    return <View style={{ height: height || 50 }} />;
  }, [height]);

  const memoizedFooter = useMemo(() => {
    return (
      <Footer
        blockable={false}
        dispatch={dispatch}
        footerHeight={footerHeight}
      />
    );
  }, [dispatch, footerHeight]);

  useEffect(() => {
    const cb = (amount: number) => {
      scrollRef?.current.scrollToOffset({
        offset: scrollHandler.value + amount,
        animated: true,
      });
    };
    ListOffsetEmitter.on(LIST_EMITTER_EVENTS.ADD_TO_OFFSET, cb);
    return () => {
      ListOffsetEmitter.off(LIST_EMITTER_EVENTS.ADD_TO_OFFSET, cb);
    };
  }, [scrollHandler, scrollRef]);

  useEffect(() => {
    const cb = (amount: number) => {
      scrollRef?.current.scrollToEnd({
        animated: true,
      });
    };
    ListOffsetEmitter.on(LIST_EMITTER_EVENTS.END, cb);
    return () => {
      ListOffsetEmitter.off(LIST_EMITTER_EVENTS.END, cb);
    };
  }, [scrollHandler, scrollRef]);

  return (
    <Animated.FlatList
      ref={scrollRef}
      style={styles.list}
      data={data}
      ListHeaderComponent={memoizedHeader}
      ListFooterComponent={memoizedFooter}
      renderItem={renderItem}
      scrollEventThrottle={16}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
    />
  );
};

export default ConversationList;

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.p1,
  },
});
