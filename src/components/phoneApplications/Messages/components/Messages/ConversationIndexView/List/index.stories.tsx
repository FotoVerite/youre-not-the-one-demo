import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ConversationListType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { ElementType } from "react";
import { View } from "react-native";

import List from ".";
import { Default as ListStory } from "./ListItem/index.stories";

export default {
  component: List,
  title: "Messages/Conversations List",
  decorators: [
    (Story: ElementType) => (
      <View style={{ padding: 24, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default: { args: { viewable: ConversationListType[] } } = {
  args: {
    // Shaping the stories through args composition.
    // The data was inherited from the Default story in Task.stories.js.
    viewable: [
      {
        ...ListStory.args,
        name: MESSAGE_CONTACT_NAME.SPAM1,
        interfaceColor: "blue",
      },
      {
        ...ListStory.args,
        name: MESSAGE_CONTACT_NAME.GRACE_RUSSO,
        hasAvailableRoute: false,
      },
      { ...ListStory.args, name: MESSAGE_CONTACT_NAME.ALICE },
      {
        ...ListStory.args,
        name: MESSAGE_CONTACT_NAME.CHRIS,
        hasAvailableRoute: false,
      },
    ],
  },
};
