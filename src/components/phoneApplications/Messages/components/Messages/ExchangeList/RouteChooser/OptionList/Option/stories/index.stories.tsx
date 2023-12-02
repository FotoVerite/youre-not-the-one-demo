import { OPTION_EFFECT_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ElementType } from "react";
import { View } from "react-native";
import FontsContextProvider from "src/contexts/fonts";

import Option from "..";
import { BaseOptionLabelType } from "../type";

export default {
  title: "Options/Glitch Effect",
  component: Option,
};

export const STATIC: {
  args: BaseOptionLabelType;
  decorators: any;
} = {
  args: {
    id: "1",
    cb: () => {},
    selected: [],
    setHeight: () => {},
    setSelected: () => {},
    option: {
      label: "I Feel Wrong",
      value: "I Feel Wrong",
      effect: OPTION_EFFECT_TYPE.STATIC,
      data: "Gah what's wrong with me",
    },
  },
  decorators: [
    (Story: ElementType) => (
      <FontsContextProvider resolver={() => {}}>
        <View style={{ padding: 24, flex: 1 }}>
          <Story />
        </View>
      </FontsContextProvider>
    ),
  ],
};

export const GLITCH: {
  args: BaseOptionLabelType;
  decorators: any;
} = {
  args: {
    id: "1",
    cb: () => {},
    selected: [],
    setHeight: () => {},
    setSelected: () => {},
    option: {
      label: "I Feel Wrong",
      value: "I Feel Wrong",
      effect: OPTION_EFFECT_TYPE.GLITCH,
      data: "Gah what's wrong with me",
    },
  },
  decorators: [
    (Story: ElementType) => (
      <FontsContextProvider resolver={() => {}}>
        <View style={{ padding: 24, flex: 1 }}>
          <Story />
        </View>
      </FontsContextProvider>
    ),
  ],
};
