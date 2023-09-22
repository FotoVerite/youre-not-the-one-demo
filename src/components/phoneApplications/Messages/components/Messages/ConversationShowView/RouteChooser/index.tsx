import { DigestedConversationType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import { convertMessageToString } from "@Components/phoneApplications/Messages/hooks/useConversations/determineLogLine";
import { BlurView } from "expo-blur";
import { FC, useState, useEffect, useMemo, useCallback, memo } from "react";
import { Platform, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import MessageTextInput from "./MessageTextInput";
import OptionList from "./OptionList";
import Option from "./OptionList/Option";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";

const RootChooser: FC<
  {
    conversation: DigestedConversationType;
  } & ConversationDispatchType
> = ({ conversation, dispatch }) => {
  const [optionListOpen, openOptionList] = useState(false);
  const [chosenOption, setChosenOption] = useState<string>("...");

  const { width } = useInsetDimensions();

  const { nextMessageInQueue, availableRoute, chosenRoute } = conversation;
  useEffect(() => {
    setChosenOption("...");
  }, [conversation.exchanges, setChosenOption]);

  const displayedText = useMemo(() => {
    if (nextMessageInQueue) {
      return convertMessageToString(nextMessageInQueue);
    }
    if (availableRoute && chosenRoute == null) {
      const { options } = availableRoute;
      if (options.length === 1) {
        return options[0];
      } else {
        return chosenOption;
      }
    }
    return undefined;
  }, [nextMessageInQueue, availableRoute, chosenRoute, chosenOption]);

  const callback = useCallback(() => {
    if (nextMessageInQueue) {
      dispatch({ type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE });
      return;
    }
    if (availableRoute) {
      const { options } = availableRoute;
      if (options.length === 1) {
        dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
          payload: { chosenOption: options[0] },
        });
      } else if (chosenOption !== "...") {
        dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
          payload: { chosenOption },
        });
      }
    }
    return () => {};
  }, [nextMessageInQueue, availableRoute, dispatch, chosenOption]);

  const Options = useMemo(() => {
    if (availableRoute) {
      const nodes = availableRoute.options.map((option) => (
        <Option
          key={`${availableRoute.routes.id}-${option}`}
          id={availableRoute.id}
          option={option}
          cb={() => {
            openOptionList(false);
            setChosenOption(option);
          }}
        />
      ));
      return nodes;
    }
  }, [availableRoute]);

  useEffect(() => {
    ConversationEmitter.on(
      CONVERSATION_EMITTER_EVENTS.RESET,
      ({ name, type }) => {
        openOptionList(false);
      }
    );
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.RESET, () => {});
    };
  }, []);
  return (
    <Animated.View style={[{ width }, styles.container]}>
      {Platform.OS === "ios" && <BlurView style={styles.blur} intensity={5} />}
      <MessageTextInput
        text={displayedText}
        cb={callback}
        openOptionList={openOptionList}
      />
      <OptionList optionListOpen={optionListOpen} setActive={openOptionList}>
        {Options}
      </OptionList>
    </Animated.View>
  );
};

export default memo(RootChooser);

const styles = StyleSheet.create({
  blur: {
    zIndex: 3,
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
  },
  container: {
    zIndex: 3,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },

  icon: {
    marginStart: "auto",
  },
});
