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
  argTypes: {
    onPinTask: { action: "onPinTask" },
    onArchiveTask: { action: "onArchiveTask" },
  },
};

export const Default = {
  args: {
    // Shaping the stories through args composition.
    // The data was inherited from the Default story in Task.stories.js.
    viewable: [
      { ...ListStory.args, name: "Spam", interfaceColor: "blue" },
      {
        ...ListStory.args,
        name: "Matthew Bergman",
        hasAvailableRoute: false,
      },
      { ...ListStory.args, name: "Alice" },
      {
        ...ListStory.args,
        name: "Sally",
        hasAvailableRoute: false,
      },
    ],
  },
};
