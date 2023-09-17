import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";

const NameLabel: FC<{ group: boolean; name?: string }> = ({ group, name }) => {
  if (!group || name === MESSAGE_CONTACT_NAME.SELF) {
    return;
  }
  return <Text style={styles.name}>{name}</Text>;
};

export default NameLabel;

const styles = StyleSheet.create({
  name: {
    fontSize: 12,
    marginTop: 1,
    marginStart: 20,
  },
});
