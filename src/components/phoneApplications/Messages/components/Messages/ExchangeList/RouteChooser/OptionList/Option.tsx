import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

const Option: FC<{
  cb: () => void;
  id: string;
  option: string;
}> = ({ cb, option }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        cb();
      }}
    >
      <Row style={styles.container}>
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Row style={styles.dateRow}>
              <Text style={styles.content}>{option}</Text>
              <FontAwesome
                name="chevron-right"
                color="black"
                size={24}
                style={styles.icon}
              />
            </Row>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.p1 / 2,
    marginHorizontal: theme.spacing.p1,

    backgroundColor: "#ebebed",
    borderRadius: theme.BorderRadius.small,
    alignItems: "center",
    height: 50,
  },
  content: {
    flex: 1,
    fontSize: 16,
    marginStart: theme.spacing.p1 / 2,
  },
  infoRow: {
    flexGrow: 0,
  },
  icon: {
    marginStart: "auto",
  },
  dateRow: {
    alignItems: "center",
  },
  date: {},
});
