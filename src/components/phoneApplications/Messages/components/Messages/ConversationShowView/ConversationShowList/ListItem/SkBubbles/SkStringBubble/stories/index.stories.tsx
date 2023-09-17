import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { DigestedConversationStringItemType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { vec } from "@shopify/react-native-skia";
import { ElementType } from "react";
import { View } from "react-native";

import {
  SkStringBubbleWrapper,
  SkStringWrapperType,
} from "./SkStringBubbleWrapper";

export default {
  title: "Bubbles/SkStringBubble",
  component: SkStringBubbleWrapper,
};

export const Default: {
  args: SkStringWrapperType;
  decorators: any;
} = {
  args: {
    addressee: true,
    isLastInExchange: false,
    content: "We have a global",
    type: MESSAGE_CONTENT.STRING,
    alignItems: "center",
    colors: MESSAGE_CONTACT_INFO["1-222-666-1337"].colors,
    cursorVector: vec(0, 0),
    name: MESSAGE_CONTACT_NAME.ALICE,
    offset: 0,
    paddingBottom: 0,
    scrollHandler: { value: 100 },
    scrollRef: null,
  },
  decorators: [
    (Story: ElementType) => (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};
