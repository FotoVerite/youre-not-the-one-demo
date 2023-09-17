import { ElementType } from "react";
import { View } from "react-native";
import ConversationList from "..";

export default {
  component: ConversationList,
  title: "Conversation List",
  decorators: [
    (Story: ElementType) => (
      <View style={{ padding: 24, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

// export const Default = {
//   args: {
//     // Shaping the stories through args composition.
//     // The data was inherited from the Default story in Task.stories.js.
//     viewable: [
//       { ...ListStory.args, name: "Spam", interfaceColor: "blue" },
//       {
//         ...ListStory.args,
//         name: "Matthew Bergman",
//         hasAvailableRoute: false,
//       },
//       { ...ListStory.args, name: "Alice" },
//       {
//         ...ListStory.args,
//         name: "Sally",
//         hasAvailableRoute: false,
//       },
//     ],
//   },
// };
