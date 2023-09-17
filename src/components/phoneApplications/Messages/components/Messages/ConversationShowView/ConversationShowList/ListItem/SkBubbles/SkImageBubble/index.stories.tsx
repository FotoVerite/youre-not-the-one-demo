import image from "@Components/notifications/NotificationPopupContainer/NotificationPopup/assets/default.jpeg";
import { ElementType } from "react";
import { View } from "react-native";

import { SkImageBubble } from ".";
import { SkBubbleType } from "../types";

export default {
  title: "Bubbles/SkImageBubble",
  component: SkImageBubble,
};

export const Default: {
  args: SkBubbleType;
  decorators: any;
} = {
  args: {
    width: 300,
    height: 300,
    addressee: true,
    isLastInExchange: false,
    content: image,
    colors: [],
    offset: 0,
  },
  decorators: [
    (Story: ElementType) => (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};
