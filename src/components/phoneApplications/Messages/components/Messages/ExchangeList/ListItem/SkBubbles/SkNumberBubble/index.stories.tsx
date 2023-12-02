import { MESSAGE_CONTACT_INFO } from "@Components/phoneApplications/Messages/constants";
import { ElementType } from "react";
import { View } from "react-native";
import FontsContextProvider from "src/contexts/fonts";

import { SkNumberBubble } from ".";
import { SkBubbleTypeWithGradient } from "../types";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default {
  title: "Bubbles/SkNumberBubble",
  component: SkNumberBubble,
};

const FontDecorator = (Story: ElementType) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <FontsContextProvider resolver={() => {}}>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    </FontsContextProvider>
  </GestureHandlerRootView>
);

export const Default: {
  args: SkBubbleTypeWithGradient;
  decorators: any;
} = {
  args: {
    width: 150,
    height: 45,
    addressee: true,
    isLastInExchange: false,
    content: "111-2323-23",
    colors: MESSAGE_CONTACT_INFO["1-222-666-1337"].colors,
    offset: 0,
    scrollHandler: { value: 100 },
    scrollRef: undefined,
  },
  decorators: [FontDecorator],
};
