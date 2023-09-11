import image from "@Components/notifications/NotificationPopupContainer/NotificationPopup/assets/default.jpeg";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { DigestedConversationImageItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { vec } from "@shopify/react-native-skia";
import { ElementType } from "react";
import { View } from "react-native";
import { theme } from "src/theme";

import { SkImageBubble } from ".";

export default {
  title: "Bubbles/SkImageBubble",
  component: SkImageBubble,
};

export const Default: {
  args: DigestedConversationImageItemType;
  decorators: any;
} = {
  args: {
    width: 300,
    height: 300,
    leftSide: true,
    isLastInExchange: false,
    content: image,
    type: MESSAGE_CONTENT.IMAGE,
    alignItems: "center",
    colors: [],
    cursorVector: vec(0, 0),
    name: MESSAGE_CONTACT_NAME.ALICE,
    offset: 0,
    paddingBottom: 0,
  },
  decorators: [
    (Story: ElementType) => (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};
