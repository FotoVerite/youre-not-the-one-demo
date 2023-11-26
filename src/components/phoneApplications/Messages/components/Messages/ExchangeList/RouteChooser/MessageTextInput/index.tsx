import { NextMessageInQueue } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { FC } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

import { useButtonStateMachine } from "./hooks/useButtonStateMachine";
import ChevronButton from "../ChevronButton";
import DisplayedText from "../DisplayedText";

const MessageTextInput: FC<{
  chevronColor?: string;
  openOptionList: React.Dispatch<React.SetStateAction<boolean>>;
  displayedTextAttributes?: NextMessageInQueue;
  cb: () => void;
}> = ({ cb, chevronColor, openOptionList, displayedTextAttributes }) => {
  const [displayedText, textState, buttonState, onPress] =
    useButtonStateMachine(openOptionList, displayedTextAttributes);

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={[styles.textInput]}>
          <Row>
            {displayedText ? (
              <DisplayedText
                text={displayedText}
                state={textState}
                cb={cb}
                key={displayedTextAttributes?.value || "blank"}
              />
            ) : (
              <View style={{ flexGrow: 1, minHeight: 35 }} />
            )}
            <View>
              <ChevronButton chevronColor={chevronColor} state={buttonState} />
            </View>
          </Row>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MessageTextInput;

const styles = StyleSheet.create({
  container: {
    zIndex: 4,
    justifyContent: "center",
  },
  textInput: {
    borderColor: "#cfcdcd",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: theme.spacing.p1,
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    backgroundColor: "#ffffffd8",
    marginVertical: theme.spacing.p1 / 2,
  },
});
