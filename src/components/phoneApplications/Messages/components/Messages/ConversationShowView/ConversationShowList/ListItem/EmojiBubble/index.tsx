import { DigestedConversationEmojiItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import React, { FC, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export const EmojiBubble: FC<{
  content: string;
  height: number;
  setAsResolved: (arg: boolean) => void;
}> = ({ content, height, setAsResolved }) => {
  useEffect(() => {
    setAsResolved(true);
  }, [setAsResolved]);

  return (
    <View
      style={[
        styles.container,
        {
          height,
        },
      ]}
    >
      <Text style={styles.emoji}>{content}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  emoji: {
    fontSize: 50,
  },
});
