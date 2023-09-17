import { ElementType } from "react";
import { View } from "react-native";

import List from "./index.stories";
import { Default as SkImageStory } from "../SkBubbles/SkImageBubble/index.stories";
import { ExchangeWrapper } from "../ExchangeWrapper";
import { ConversationExchangeWrapperType } from "../ExchangeWrapper/types";
import unknown from "@Components/phoneApplications/Messages/assets/avatars/unknown.jpeg";
import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { SkImageBubble } from "../SkBubbles/SkImageBubble";
import { SkBubbleType } from "../SkBubbles/types";

export default {
  component: ExchangeWrapper,
  title: "ConversationList/Wrapper",
  decorators: [
    (Story: ElementType) => (
      <View style={{ padding: 24, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  // render: (args) => (
  //   <ExchangeWrapper {...args}>
  //     {args.children.map((item: SkBubbleType) => (
  //       <SkImageBubble {...item} />
  //     ))}
  //   </ExchangeWrapper>
  // ),
};

export const Default: {
  args: ConversationExchangeWrapperType;
  decorators: any;
} = {
  args: {
    addressee: false,
    alignItems: "flex-end",
    avatar: unknown,
    colors: MESSAGE_CONTACT_INFO[MESSAGE_CONTACT_NAME.SPAM1].colors,
    group: false,
    height: SkImageStory.args.height,
    paddingBottom: 20,
    name: MESSAGE_CONTACT_NAME.SPAM1,
    reactionName: "heart",
    reactionColor: "red",
    reactionAnimated: false,
    children: <SkImageBubble {...{ ...SkImageStory.args, addressee: false }} />,
  },
  decorators: [],
};

export const AsAssignee: {
  args: ConversationExchangeWrapperType;
  decorators: any;
} = {
  args: {
    addressee: true,
    alignItems: "flex-start",
    avatar: unknown,
    colors: MESSAGE_CONTACT_INFO[MESSAGE_CONTACT_NAME.SPAM1].colors,
    group: false,
    height: SkImageStory.args.height,
    paddingBottom: 20,
    name: MESSAGE_CONTACT_NAME.SPAM1,
    reactionName: "heart",
    reactionColor: "red",
    reactionAnimated: false,
    children: <SkImageBubble {...{ ...SkImageStory.args, addressee: true }} />,
  },
  decorators: [],
};
