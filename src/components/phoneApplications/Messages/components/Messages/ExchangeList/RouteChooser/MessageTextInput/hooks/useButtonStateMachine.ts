import { NextMessageInQueue } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDeleteAndReplace } from "./useDeleteAndReplace";
import ListOffsetEmitter, { LIST_EMITTER_EVENTS } from "../../../emitters";
import { MESSAGE_SEND_BUTTON_STATE } from "../../ChevronButton";
import { DISPLAYED_TEXT_STATES } from "../../DisplayedText";
import { NEXT_MESSAGE_EFFECT_TYPE } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";

export const useButtonStateMachine = (
  openOptionList: React.Dispatch<React.SetStateAction<boolean>>,
  displayedTextAttributes?: NextMessageInQueue
) => {
  const value = displayedTextAttributes?.value;
  const sent = useRef(true);
  const [displayedText, setText] = useState(value);
  const [textState, setTextState] = useState(DISPLAYED_TEXT_STATES.DISPLAYED);
  const [buttonState, setButtonState] = useState(
    value != null
      ? MESSAGE_SEND_BUTTON_STATE.SENDABLE
      : MESSAGE_SEND_BUTTON_STATE.INACTIVE
  );
  useEffect(() => {
    if (!displayedTextAttributes) {
      setText(undefined);
      return;
    }
    switch (displayedTextAttributes.nextMessageEffect) {
      case NEXT_MESSAGE_EFFECT_TYPE.RETYPE:
        setText(
          displayedTextAttributes.data
            ? displayedTextAttributes.data[0]
            : displayedTextAttributes.value
        );
        break;
      default:
        setText(displayedTextAttributes.value);
        break;
    }
  }, [displayedTextAttributes]);

  useEffect(() => {
    setTextState(DISPLAYED_TEXT_STATES.DISPLAYED);
    if (value != null && value !== "...") {
      sent.current = false;
      setButtonState(MESSAGE_SEND_BUTTON_STATE.SENDABLE);
    } else if (value === "...") {
      sent.current = true;
      setButtonState(MESSAGE_SEND_BUTTON_STATE.HAS_CONTENT);
    } else {
      setButtonState(MESSAGE_SEND_BUTTON_STATE.INACTIVE);
    }
  }, [value]);

  const sendMessage = useCallback(() => {
    sent.current = true;
    setTextState(DISPLAYED_TEXT_STATES.SENT);
    setButtonState(MESSAGE_SEND_BUTTON_STATE.WAITING);
  }, []);

  const openCloseOptionMenu = () => {
    setButtonState(MESSAGE_SEND_BUTTON_STATE.OPEN);
    openOptionList((menuIsOpen) => {
      setButtonState(
        menuIsOpen
          ? MESSAGE_SEND_BUTTON_STATE.HAS_CONTENT
          : MESSAGE_SEND_BUTTON_STATE.OPEN
      );
      return !menuIsOpen;
    });
  };

  const override = useDeleteAndReplace(
    value || "",
    setText,
    displayedTextAttributes?.data || [],
    sendMessage
  );

  const onButtonPress = () => {
    ListOffsetEmitter.emit(LIST_EMITTER_EVENTS.END, 0);
    if (value && !sent.current) {
      switch (displayedTextAttributes.nextMessageEffect) {
        case NEXT_MESSAGE_EFFECT_TYPE.RETYPE:
          override();
          break;
        default:
          sendMessage();
          break;
      }
    } else if (value === "...") {
      openCloseOptionMenu();
    }
  };

  return [displayedText, textState, buttonState, onButtonPress] as const;
};
