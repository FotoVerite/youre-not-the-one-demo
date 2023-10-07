import { formatConversationTime } from "@Components/phoneApplications/Messages/hooks/useConversations/determineLogLine";
import React, { FC } from "react";
import { LayoutChangeEvent, Text } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "src/theme";

export const Timestamp: FC<{
  addressee: boolean;
  height: number;
  timestamp?: string;
  translateX: SharedValue<number>;
  timeWidth: number;
  setTimeWidth: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  addressee,
  height,
  timestamp,
  translateX,
  timeWidth,
  setTimeWidth,
}) => {
  const slideIn = useAnimatedStyle(() => {
    const translate = interpolate(
      translateX.value,
      [0, 1],
      [timeWidth, addressee ? 0 : timeWidth - 20],
    );
    return { transform: [{ translateX: translate }] };
  });

  if (!timestamp) {
    return <></>;
  }

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: height / 2 - 10,
          right: 0,
        },
        slideIn,
      ]}
    >
      <Text
        onLayout={(layout: LayoutChangeEvent) => {
          setTimeWidth(layout.nativeEvent.layout.width + theme.spacing.p2);
        }}
      >
        {formatConversationTime(timestamp)}
      </Text>
    </Animated.View>
  );
};
