import { DigestedConversationType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { convertMessageToString } from "@Components/phoneApplications/Messages/hooks/useConversations/determineLogLine";
import { BlurView } from "expo-blur";
import { FC, useState, useEffect, useMemo, useCallback, memo } from "react";
import { useWindowDimensions, Platform, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import MessageTextInput from "./MessageTextInput";
import OptionList from "./OptionList";
import Option from "./OptionList/Option";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";

const RootChooser: FC<{ conversation: DigestedConversationType }> = ({
  conversation,
}) => {
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
      //return dispatch({ type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE });
    }
    if (availableRoute) {
      const { options } = availableRoute;
      if (options.length === 1) {
        ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.START_ROUTE, {
          name: conversation.name,
          additional: options[0],
        });
      } else if (chosenOption !== "...") {
        ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.START_ROUTE, {
          name: conversation.name,
          additional: chosenOption,
        });
      }
    }
    return () => {};
  }, [nextMessageInQueue, availableRoute, chosenOption]);

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
