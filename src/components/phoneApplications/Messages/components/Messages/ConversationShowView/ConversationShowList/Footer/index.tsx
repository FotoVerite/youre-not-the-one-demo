import {
  ConversationReducerActionsType,
  CONVERSATION_REDUCER_ACTIONS,
} from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import React, { FC } from "react";
import { Text } from "react-native";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "src/theme";

const Footer: FC<{
  blockable: boolean;
  dispatch: (action: ConversationReducerActionsType) => void;
  footerHeight: SharedValue<number>;
}> = ({ blockable, dispatch, footerHeight }) => {
  const animatedMargin = useAnimatedStyle(() => {
    return {
      marginBottom: theme.spacing.p2 + 50,
    };
  });
  return (
    <Animated.View style={animatedMargin}>
      {__DEV__ && (
        <TouchableHighlight
          onPress={() =>
            dispatch({ type: CONVERSATION_REDUCER_ACTIONS.SKIP_ROUTE })
          }
        >
          <Text style={{ textAlign: "right" }}>skip conversation</Text>
        </TouchableHighlight>
      )}
      {blockable && (
        <TouchableWithoutFeedback
          onPress={() => dispatch({ type: CONVERSATION_REDUCER_ACTIONS.BLOCK })}
        >
          <Text style={{ textAlign: "center" }}>Block This Phone Number</Text>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};

export default Footer;
