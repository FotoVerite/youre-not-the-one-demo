import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import { ConversationListType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { FC, memo } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

const ConversationListItem: FC<Omit<ConversationListType, "tags">> = ({
  heroImage,
  hasAvailableRoute,
  logline_content,
  logline_timestamp,
  interfaceColor,
  name,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.SHOW, { name })
      }
    >
      <Row>
        <View
          style={[
            styles.availableRouteIndicator,
            {
              backgroundColor: hasAvailableRoute
                ? interfaceColor
                : "transparent",
            },
          ]}
        />
        <Image source={heroImage} style={styles.image} />
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Row style={styles.dateRow}>
              <Text>{logline_timestamp}</Text>
              <FontAwesome
                name="chevron-right"
                color="gray"
                size={13}
                style={styles.chevron}
              />
            </Row>
          </Row>
          <Text>{logline_content}</Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default memo(ConversationListItem);

const styles = StyleSheet.create({
  availableRouteIndicator: {
    height: 12,
    width: 6,
    alignSelf: "center",
    borderTopEndRadius: theme.BorderRadius.normal,
    borderBottomEndRadius: theme.BorderRadius.normal,
    marginEnd: theme.spacing.p1 / 2,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: theme.spacing.p2,
    overflow: "hidden",
    aspectRatio: 1,
    borderRadius: 25,
  },
  infoRow: {
    flexGrow: 0,
    alignItems: "center",
    marginBottom: theme.spacing.p1 / 4,
  },
  dateRow: {
    flexGrow: 0,
    marginLeft: "auto",
    alignItems: "center",
  },
  chevron: {
    marginStart: 12,
  },
  content: {
    flex: 1,
    alignSelf: "center",
    marginEnd: theme.spacing.p1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
});
