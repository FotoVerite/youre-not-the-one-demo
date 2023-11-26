import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import {
  isAvailableRoute,
  isDigestedChoosableRoute,
  isStartedRoute,
} from "@Components/phoneApplications/Messages/hooks/routes/guards";
import { DigestedConversationType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import { BlurView } from "expo-blur";
import { FC, useState, useEffect, useMemo, useCallback, memo } from "react";
import { Platform, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import MessageTextInput from "./MessageTextInput";
import OptionList from "./OptionList";
import Option from "./OptionList/Option";

const RootChooser: FC<
  {
    conversation: DigestedConversationType;
  } & ConversationDispatchType
> = ({ conversation, dispatch }) => {
  const [optionListOpen, openOptionList] = useState(false);
  const [chosenOption, setChosenOption] = useState<string>("...");

  const { width } = useInsetDimensions();

  const activeRoute = conversation.activeRoute;

  useEffect(() => {
    setChosenOption("...");
  }, [conversation.exchanges, setChosenOption]);

  const displayedTextAttributes = useMemo(() => {
    if (isStartedRoute(activeRoute) && activeRoute.nextMessageInQueue) {
      return activeRoute.nextMessageInQueue;
    }
    if (
      isAvailableRoute(activeRoute) &&
      isDigestedChoosableRoute(activeRoute)
    ) {
      const options = activeRoute.options;
      if (options.length === 1) {
        return { value: options[0].label };
      } else {
        return { value: chosenOption };
      }
    }
    return undefined;
  }, [activeRoute, chosenOption]);

  const callback = useCallback(() => {
    if (isStartedRoute(activeRoute)) {
      dispatch({ type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE });
      return;
    }
    if (isDigestedChoosableRoute(activeRoute)) {
      const options = activeRoute.options;
      if (options.length === 1) {
        dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
          payload: { chosenOption: options[0].value },
        });
      } else if (chosenOption !== "...") {
        dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
          payload: { chosenOption },
        });
      }
    }
    return () => {};
  }, [activeRoute, dispatch, chosenOption]);

  const Options = useMemo(() => {
    if (isDigestedChoosableRoute(activeRoute)) {
      const nodes = activeRoute.options.map((option) => (
        <Option
          key={`${activeRoute.routes.id}-${option.value}`}
          id={activeRoute.id}
          option={option.label}
          cb={() => {
            openOptionList(false);
            setChosenOption(option.value);
          }}
          effect={option.effect}
          effectData={option.data}
        />
      ));
      return nodes;
    }
  }, [activeRoute]);

  useEffect(() => {
    const cb = (payload: {
      name: MESSAGE_CONTACT_NAME;
      type?: "new" | "base" | undefined;
      additional?: string | undefined;
    }) => {
      openOptionList(false);
    };

    ConversationEmitter.on(CONVERSATION_EMITTER_EVENTS.RESET, cb);
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.RESET, cb);
    };
  }, []);
  return (
    <Animated.View style={[{ width }, styles.container]}>
      {Platform.OS === "ios" && <BlurView style={styles.blur} intensity={5} />}
      <MessageTextInput
        chevronColor={conversation.interfaceColor}
        displayedTextAttributes={displayedTextAttributes}
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
