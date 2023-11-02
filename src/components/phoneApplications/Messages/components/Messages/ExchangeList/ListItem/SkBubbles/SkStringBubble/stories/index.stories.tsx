import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
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
    content:
      "Same API that's in React Native. The default origin of the transformation is, however, different. It is the center object in React Native and the top-left corner in Skia.",
    type: MESSAGE_CONTENT.STRING,
    alignItems: "center",
    colors: MESSAGE_CONTACT_INFO["1-222-666-1337"].colors,
    cursorVector: vec(0, 0),
    name: MESSAGE_CONTACT_NAME.ALICE,
    offset: 0,
    paddingBottom: 0,
    scrollHandler: { value: 100 },
    scrollRef: null,
    setAsResolved: () => {},
  },
  decorators: [
    (Story: ElementType) => (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};
