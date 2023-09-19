import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import React, { FC } from "react";
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

const Header: FC<{
  color: string;
  name: MESSAGE_CONTACT_NAME;
  visible: SharedValue<number>;
  shrink: SharedValue<number>;
}> = ({ color, name, shrink, visible }) => {
  //   const popInAndTranslateAnimation = useAnimatedStyle(() => {
  //     return {
  //       opacity: visible.value,
  //       //marginLeft: interpolate(visible.value, [0, 1], [width, 0]),
  //       //   borderTopLeftRadius: interpolate(shrink.value, [0, 1], [0, 10]),
  //       //   borderTopRightRadius: interpolate(shrink.value, [0, 1], [0, 10]),
  //     };
  //   }, [visible]);

  return (
    <Animated.View style={[styles.header]}>
      {Platform.OS === "ios" && <BlurView style={styles.blur} intensity={20} />}
      {Platform.OS !== "ios" && (
        <View style={[styles.blur, { backgroundColor: theme.colors.muted }]} />
      )}
      <Row style={styles.row}>
        <View style={styles.spacer}>
          <Row style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => {
                ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.RESET, {
                  name,
                });
              }}
            >
              <FontAwesome
                suppressHighlighting
                name="chevron-left"
                size={20}
                color={color}
                style={[styles.chevron]}
              />
            </TouchableWithoutFeedback>
          </Row>
        </View>
        <Text style={[styles.chatName]}>{name}</Text>
        <View style={styles.spacer} />
      </Row>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chevron: {
    alignItems: "center",
    marginStart: theme.spacing.p1,
    paddingEnd: theme.spacing.p4,
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 24,
    zIndex: 3,
  },
  header: {
    height: 50,
    zIndex: 2,
    position: "absolute",
    width: "100%",
    top: 0,
    backgroundColor: "#ffffff79",
  },
  blur: {
    zIndex: 3,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  row: {
    alignItems: "center",
    zIndex: 3,
  },
  spacer: {
    flex: 1,
  },
});

export default Header;
