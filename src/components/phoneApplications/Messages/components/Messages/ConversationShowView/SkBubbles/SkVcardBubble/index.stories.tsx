import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { DigestedConversationVCardItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { vec } from "@shopify/react-native-skia";
import { ElementType } from "react";
import { View } from "react-native";
import FontsContextProvider from "src/contexts/fonts";

import { SkVcardBubble } from ".";

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
  args: DigestedConversationVCardItemType;
  decorators: any;
} = {
  args: {
    width: 300,
    height: 75,
    leftSide: true,
    isLastInExchange: false,
    content: MESSAGE_CONTACT_NAME.GRACE_RUSSO,
    type: MESSAGE_CONTENT.VCARD,
    alignItems: "center",
    colors: MESSAGE_CONTACT_INFO["1-222-666-1337"].colors,
    cursorVector: vec(0, 0),
    name: MESSAGE_CONTACT_NAME.ALICE,
    offset: 0,
    paddingBottom: 0,
    scrollHandler: { value: 100 },
  },
  decorators: [FontDecorator],
};
