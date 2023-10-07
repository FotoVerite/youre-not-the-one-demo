import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FC } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

import Cursor from "../../../ExchangeList/RouteChooser/Cursor";

const NameSelect: FC<{
  contact?: string;
}> = ({ contact }) => {
  return (
    <Row style={styles.container}>
      <Text>To: </Text>
      <View style={[styles.textInput]}>
        {!contact && <Cursor />}
        {contact && <Text>{contact}</Text>}
        {!contact && (
          <TouchableWithoutFeedback onPress={() => {}}>
            <FontAwesome size={20} name="plus-circle" style={styles.icon} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </Row>
  );
};

export default NameSelect;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.p1,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#e7e7e7",
    borderColor: "#4b4646a4",
    borderStyle: "solid",
    borderWidth: 1,

    borderRadius: theme.BorderRadius.small,
    height: 30,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 4,
    flex: 1,
  },
  icon: {
    marginStart: "auto",
  },
});
