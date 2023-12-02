import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

import BaseOption from "./BaseOption";
import { BaseOptionLabelType } from "./type";

const OptionWithoutEffects: FC<BaseOptionLabelType> = ({ option, cb }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        cb(option.value);
      }}
    >
      <BaseOption value={option.value} />
    </TouchableOpacity>
  );
};

export default OptionWithoutEffects;
