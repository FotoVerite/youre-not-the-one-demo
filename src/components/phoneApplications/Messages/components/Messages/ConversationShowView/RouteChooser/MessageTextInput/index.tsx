import { FC, useRef, useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

import ListOffsetEmitter, {
  LIST_EMITTER_EVENTS,
} from "../../ConversationShowList/emitters";
import ChevronButton, { MESSAGE_SEND_BUTTON_STATE } from "../ChevronButton";
import DisplayedText, { DISPLAYED_TEXT_STATES } from "../DisplayedText";

const MessageTextInput: FC<{
  openOptionList: React.Dispatch<React.SetStateAction<boolean>>;
  text?: string;
  cb: () => void;
}> = ({ cb, openOptionList, text }) => {
  const sent = useRef(true);
  const [textState, setTextState] = useState(DISPLAYED_TEXT_STATES.DISPLAYED);
  const [buttonState, setButtonState] = useState(
    text != null
      ? MESSAGE_SEND_BUTTON_STATE.SENDABLE
      : MESSAGE_SEND_BUTTON_STATE.INACTIVE,
  );

  useEffect(() => {
    setTextState(DISPLAYED_TEXT_STATES.DISPLAYED);
    if (text != null && text !== "...") {
      sent.current = false;
      setButtonState(MESSAGE_SEND_BUTTON_STATE.SENDABLE);
    } else if (text === "...") {
      sent.current = true;
      setButtonState(MESSAGE_SEND_BUTTON_STATE.HAS_CONTENT);
    } else {
      setButtonState(MESSAGE_SEND_BUTTON_STATE.INACTIVE);
    }
  }, [text]);

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback
        onPress={() => {
          ListOffsetEmitter.emit(LIST_EMITTER_EVENTS.END, 0);
          if (text && !sent.current) {
            sent.current = true;
            setTextState(DISPLAYED_TEXT_STATES.SENT);
            setButtonState(MESSAGE_SEND_BUTTON_STATE.WAITING);
          } else if (text === "...") {
            setButtonState(MESSAGE_SEND_BUTTON_STATE.OPEN);
            openOptionList((isOpen) => {
              setButtonState(
                isOpen
                  ? MESSAGE_SEND_BUTTON_STATE.HAS_CONTENT
                  : MESSAGE_SEND_BUTTON_STATE.OPEN,
              );
              return !isOpen;
            });
          }
        }}
      >
        <View style={[styles.textInput]}>
          <Row>
            {text ? (
              <DisplayedText text={text} state={textState} cb={cb} key={text} />
            ) : (
              <View style={{ flexGrow: 1, minHeight: 35 }} />
            )}
            <View>
              <ChevronButton state={buttonState} />
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
