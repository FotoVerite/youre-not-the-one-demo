import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Row } from "src/utility/layout";

import { Avatar } from "./Avatar";
import NameLabel from "./NameLabel";
import Reaction from "./Reaction";
import { Timestamp } from "./Timestamp";
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
  reactionDelay,
  reactionName,
  timestamp,
  translateX,
}) => {
  const [timeWidth, setTimeWidth] = useState(85);

  const slideIn = useAnimatedStyle(() => {
    const translate = interpolate(
      translateX.value,
      [0, 1],
      [0, -timeWidth + 20]
    );
    if (addressee) {
      return {};
    }
    return { transform: [{ translateX: translate }] };
  });

  return (
    <Animated.View
      style={[{ alignItems, height: height + paddingBottom }, slideIn]}
    >
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
          reactionDelay={reactionDelay}
        />
        <View style={{ alignSelf: "flex-start" }}>
          {children}
          <NameLabel name={name} group={group || false} />
        </View>
      </Row>
      <Timestamp
        addressee={addressee}
        height={height}
        timestamp={timestamp}
        timeWidth={timeWidth}
        setTimeWidth={setTimeWidth}
        translateX={translateX}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-end",
    padding: 0,
    margin: 0,
  },
});
