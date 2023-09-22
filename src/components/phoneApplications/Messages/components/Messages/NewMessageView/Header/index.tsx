import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

import NameSelect from "./NameSelect";
const Header: FC<{
  name: MESSAGE_CONTACT_NAME;
}> = ({ name }) => {
  return (
    <View style={styles.header}>
      <Row>
        <View style={styles.spacer} />
        <Text style={styles.title}>New Message</Text>
        <View style={styles.spacer}>
          <TouchableWithoutFeedback
            style={{}}
            onPress={() => {
              ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.RESET, {
                name,
                type: "new",
              });
            }}
          >
            <Text suppressHighlighting style={styles.cancel}>
              Cancel
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Row>
      <NameSelect contact={name} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#c9c7c7",
    flexGrow: 0,
    padding: theme.spacing.p1,
    borderTopRightRadius: theme.BorderRadius.small,
    borderTopLeftRadius: theme.BorderRadius.small,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  cancel: {
    fontSize: 12,
    color: "blue",
    marginStart: "auto",
    marginEnd: theme.spacing.p2,
  },
  doneContainer: { marginStart: "auto" },
  imageContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  row: {
    flexGrow: 0,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    paddingVertical: theme.spacing.p1,
    paddingHorizontal: theme.spacing.p1,
  },

  screen: {
    zIndex: 4,
    position: "absolute",
    width: "100%",
  },
  spacer: {
    flex: 1,
  },
});

export default Header;
