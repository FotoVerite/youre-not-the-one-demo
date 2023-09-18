import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

const NoOption: FC<{
  setActive: (boolean: boolean) => void;
}> = ({ setActive }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setActive(false);
      }}
    >
      <Row style={styles.container}>
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Row style={styles.dateRow}>
              <Text style={styles.content}>
                {"I have nothing to say to them at the moment."}
              </Text>
              <FontAwesome
                name="chevron-right"
                color={"black"}
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

export default NoOption;

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
