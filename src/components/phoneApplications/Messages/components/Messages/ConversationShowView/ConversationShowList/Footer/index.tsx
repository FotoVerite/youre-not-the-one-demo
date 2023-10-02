import { useAppEventsContext } from "@Components/appEvents/context";
import {
  ConversationReducerActionsType,
  CONVERSATION_REDUCER_ACTIONS,
} from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import React, { FC } from "react";
import { Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";
import { removeData, storeData } from "src/utility/storage";

const Footer: FC<{
  blockable: boolean;
  dispatch: (action: ConversationReducerActionsType) => void;
  footerHeight: SharedValue<number>;
}> = ({ blockable, dispatch, footerHeight }) => {
  const eventContext = useAppEventsContext();
  const animatedMargin = useAnimatedStyle(() => {
    return {
      marginBottom: theme.spacing.p2 + 50,
    };
  });
  return (
    <Animated.View style={animatedMargin}>
      {__DEV__ && (
        <>
          <Row style={{ flex: 1, marginBottom: 24 }}>
            <TouchableWithoutFeedback
              containerStyle={{ flex: 1 }}
              onPress={() =>
                storeData("events", JSON.stringify(eventContext.state))
              }
            >
              <Text style={{ fontSize: 20 }}>Save</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => removeData("events")}>
              <Text style={{ fontSize: 20 }}>Reset</Text>
            </TouchableWithoutFeedback>
          </Row>
          <Row style={{ flex: 1 }}>
            <TouchableWithoutFeedback
              containerStyle={{ flex: 1 }}
              onPress={() =>
                dispatch({ type: CONVERSATION_REDUCER_ACTIONS.SKIP_ROUTE })
              }
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "left",
                  marginStart: "auto",
                }}
              >
                Skip
              </Text>
            </TouchableWithoutFeedback>
          </Row>
        </>
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
