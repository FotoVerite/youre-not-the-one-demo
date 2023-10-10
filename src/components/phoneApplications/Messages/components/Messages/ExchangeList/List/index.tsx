import { DigestedConversationListItem } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationReducerActionsType } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { FC, useMemo, useEffect } from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";
import { theme } from "src/theme";

import Footer from "../Footer";
import ListItem from "../ListItem";
import { ExchangeListItemType } from "../ListItem/types";
import ListOffsetEmitter, { LIST_EMITTER_EVENTS } from "../emitters";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

const renderItem: ListRenderItem<ExchangeListItemType> = ({ item }) => (
  <ListItem {...item} />
);

const getItemLayout = (
  data: ArrayLike<ExchangeListItemType> | null | undefined,
  index: number
) => ({
  length: data ? data[index].height + data[index].paddingBottom : 0,
  offset: data ? data[index].offset : 0,
  index,
});

const keyExtractor = (item: DigestedConversationListItem, index: number) =>
  index + `-conversation-${item.ID}`;

const List: FC<{
  blockable: boolean;
  exchanges: DigestedConversationListItem[];
  height?: number;
  dispatch: (action: ConversationReducerActionsType) => void;
  translateX: SharedValue<number>;
}> = ({ blockable, dispatch, height, exchanges, translateX }) => {
  const scrollRef = useAnimatedRef<Animated.FlatList<any>>();
  const scrollHandler = useScrollViewOffset(scrollRef as any);
  const windowHeight = useInsetDimensions().height;

  const data = useMemo(() => {
    return exchanges.map((item) => {
      return {
        ...item,
        ...{ scrollRef, scrollHandler, dispatch, translateX },
      } as ExchangeListItemType;
    });
  }, [exchanges, scrollRef, scrollHandler, dispatch, translateX]);

  const initialIndex = useMemo(() => {
    return exchanges.reduceRight(
      (acc, payload) => {
        if (acc.height > 0) {
          acc.index -= 1;
          acc.height -= payload.height + payload.paddingBottom;
        }
        return acc;
      },
      { index: exchanges.length - 1, height: windowHeight - 500 }
    ).index;
  }, [exchanges, windowHeight]);

  const footerHeight = useSharedValue(0);

  const memoizedHeader = useMemo(() => {
    return <View style={{ height: height || 50 }} />;
  }, [height]);

  const memoizedFooter = useMemo(() => {
    return (
      <Footer
        blockable={blockable}
        dispatch={dispatch}
        footerHeight={footerHeight}
      />
    );
  }, [blockable, dispatch, footerHeight]);

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
      initialScrollIndex={Math.max(initialIndex, 0)}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.p1,
  },
});
