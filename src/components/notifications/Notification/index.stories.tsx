import image from "@Components/notifications/NotificationPopupContainer/NotificationPopup/assets/default.jpeg";
import { ElementType } from "react";
import { View } from "react-native";
import { theme } from "src/theme";

import Notification from ".";

export default {
  title: "Notification",
  component: Notification,
  argTypes: {
    updatedAt: { control: "date" },
  },
};

export const Default = {
  args: {
    backgroundColor: theme.colors.muted,
    content: "This is a notification's content",
    image,
    title: "This is a notification's title",
    updatedAt: new Date(),
  },
  decorators: [
    (Story: ElementType) => (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};
