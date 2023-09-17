import { ConversationListType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import React, { FC, RefObject } from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import ConversationListItem from "./ListItem";

function Separator() {
  return <View style={styles.itemSeparator} />;
}

function ListHeader() {
  return <View style={{ height: 50 }} />;
}
const renderItem: ListRenderItem<ConversationListType> = ({ item }) => (
  <ConversationListItem
    heroImage={item.heroImage}
    hasAvailableRoute={item.hasAvailableRoute}
    interfaceColor={item.interfaceColor}
    name={item.name}
    logline_timestamp={item.logline_timestamp}
    logline_content={item.logline_content}
  />
);

const List: FC<{
  viewable: ConversationListType[];
  aref: RefObject<Animated.FlatList<ConversationListType>>;
}> = ({ aref, viewable }) => {
  return (
    <Animated.FlatList
      ref={aref}
      ItemSeparatorComponent={Separator}
      style={styles.list}
      data={viewable}
      renderItem={renderItem}
      keyExtractor={(item: ConversationListType, index) =>
        index + `-conversation-${item.name}`
      }
      ListHeaderComponent={ListHeader}
      scrollEventThrottle={16}
      ListFooterComponent={ListHeader}
    />
  );
};

export default List;

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
