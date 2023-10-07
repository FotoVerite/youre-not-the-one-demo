import unknown from "@Components/phoneApplications/Messages/assets/avatars/unknown.jpeg";
import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ElementType } from "react";
import { View } from "react-native";

import { ExchangeWrapper } from "../ExchangeWrapper";
import { ConversationExchangeWrapperType } from "../ExchangeWrapper/types";
import { SkImageBubble } from "../SkBubbles/SkImageBubble";
import { Default as SkImageStory } from "../SkBubbles/SkImageBubble/index.stories";

export default {
  component: ExchangeWrapper,
  title: "ConversationList/Wrapper",
  args: {
    avatar: unknown,
  },
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
    colors: MESSAGE_CONTACT_INFO[MESSAGE_CONTACT_NAME.SPAM1].colors,
    children: <SkImageBubble {...{ ...SkImageStory.args, addressee: false }} />,
    group: false,
    height: SkImageStory.args.height,
    paddingBottom: 20,
    name: MESSAGE_CONTACT_NAME.SPAM1,
    reactionName: "heart",
    reactionColor: "red",
    reactionAnimated: false,
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
    children: <SkImageBubble {...{ ...SkImageStory.args, addressee: true }} />,
    group: false,
    height: SkImageStory.args.height,
    paddingBottom: 20,
    name: MESSAGE_CONTACT_NAME.SPAM1,
    reactionName: "heart",
    reactionColor: "red",
    reactionAnimated: false,
  },
  decorators: [],
};

export const WithReactionDelay: {
  args: ConversationExchangeWrapperType;
  decorators: any;
} = {
  args: {
    addressee: true,
    alignItems: "flex-start",
    avatar: unknown,
    colors: MESSAGE_CONTACT_INFO[MESSAGE_CONTACT_NAME.SPAM1].colors,
    children: <SkImageBubble {...{ ...SkImageStory.args, addressee: true }} />,
    group: false,
    height: SkImageStory.args.height,
    paddingBottom: 20,
    name: MESSAGE_CONTACT_NAME.SPAM1,
    reactionName: "heart",
    reactionColor: "red",
    reactionAnimated: true,
    reactionDelay: 2000,
  },
  decorators: [],
};
