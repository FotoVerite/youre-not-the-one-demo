import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Row } from "src/utility/layout";

import { Avatar } from "./Avatar";
import NameLabel from "./NameLabel";
import Reaction from "./Reaction";
import { ConversationExchangeWrapperType } from "./types";

export const ExchangeWrapper: FC<ConversationExchangeWrapperType> = ({
  avatar,
  addressee,
  alignItems,
  children,
  colors,
  group,
  height,
  name,
  paddingBottom,
  reactionAnimated,
  reactionColor,
  reactionName,
}) => {
  return (
    <View style={{ alignItems, height: height + paddingBottom }}>
      <Row style={styles.row}>
        <Avatar
          avatar={avatar}
          addressee={addressee}
          paddingBottom={paddingBottom}
        />
        <Reaction
          reactionName={reactionName}
          addressee={addressee}
          colors={colors}
          reactionAnimated={reactionAnimated || false}
          reactionColor={reactionColor}
        />
        <View style={{ alignSelf: "flex-start" }}>
          {children}
          <NameLabel name={name} group={group || false} />
        </View>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-end",
    padding: 0,
    margin: 0,
  },
});
