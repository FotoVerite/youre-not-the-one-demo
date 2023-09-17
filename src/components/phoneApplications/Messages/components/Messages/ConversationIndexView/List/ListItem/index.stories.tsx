import image from "@Components/notifications/NotificationPopupContainer/NotificationPopup/assets/default.jpeg";
import { ElementType } from "react";
import { View } from "react-native";

import ConversationListItem from ".";

export default {
  title: "Messages/Conversations List/ListItem",
  component: ConversationListItem,
};

export const Default = {
  args: {
    interfaceColor: "green",
    heroImage: image,
    hasAvailableRoute: true,
    logline_content: "This is a conversation item's content",
    logline_timestamp: "11:30 PM",
    name: "This is a conversation item's title",
    tags: [],
  },
  decorators: [
    (Story: ElementType) => (
      <View
        style={{
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
};
