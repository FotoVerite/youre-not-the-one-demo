import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { vec } from "@shopify/react-native-skia";
import { ElementType } from "react";
import { View } from "react-native";
import FontsContextProvider from "src/contexts/fonts";

import { SkVcardBubble } from ".";
import { SkBubbleTypeWithGradient } from "../types";

export default {
  title: "Bubbles/SkVcardBubble",
  component: SkVcardBubble,
};

const FontDecorator = (Story: ElementType) => (
  <FontsContextProvider>
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Story />
    </View>
  </FontsContextProvider>
);

export const Default: {
  args: SkBubbleTypeWithGradient;
  decorators: any;
} = {
  args: {
    width: 300,
    height: 75,
    addressee: true,
    isLastInExchange: false,
    content: MESSAGE_CONTACT_NAME.GRACE_RUSSO,
    colors: MESSAGE_CONTACT_INFO["1-222-666-1337"].colors,
    offset: 0,
    scrollHandler: { value: 100 },
    scrollRef: undefined,
  },
  decorators: [FontDecorator],
};
