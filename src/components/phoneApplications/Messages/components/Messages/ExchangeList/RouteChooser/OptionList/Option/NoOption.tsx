import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

import BaseOption from "./BaseOption";

const NoOption: FC<{
  setActive: (boolean: boolean) => void;
}> = ({ setActive }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setActive(false);
      }}
    >
      <BaseOption value="I have nothing to say to them at the moment." />
    </TouchableOpacity>
  );
};

export default NoOption;
