import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";

export const TimeStamp: FC<{ content: string; height: number }> = ({
  height,
  content,
}) => {
  return <Text style={[styles.time, { height }]}>{content}</Text>;
};

const styles = StyleSheet.create({
  time: {
    margin: 0,
    marginTop: 0,
    fontSize: 10,
    textAlign: "center",
  },
});
