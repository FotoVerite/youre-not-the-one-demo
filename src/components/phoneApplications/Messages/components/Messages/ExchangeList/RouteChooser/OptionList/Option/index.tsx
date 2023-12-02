import React, { FC, useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";

import OptionWithDisplayEffect from "./OptionWithDisplayEffect";
import OptionWithShader from "./OptionWithShader";
import OptionWithoutEffects from "./OptionWithoutEffects";
import { isOptionDisplayEffect, isOptionShaderEffect } from "./guards";
import { BaseOptionLabelType } from "./type";

const Option: FC<BaseOptionLabelType> = (props) => {
  const { option, cb, ...additionProps } = props;
  const height = useSharedValue(50);
  const setHeight = props.setHeight;
  useEffect(() => {
    if (option.effect == null) {
      setHeight((s) => s.concat(height));
    }
  }, [height, option.effect, setHeight]);

  if (option.effect == null) {
    return <OptionWithoutEffects {...additionProps} option={option} cb={cb} />;
  }
  if (isOptionShaderEffect(option)) {
    return <OptionWithShader {...additionProps} option={option} cb={cb} />;
  }

  if (isOptionDisplayEffect(option)) {
    return (
      <OptionWithDisplayEffect {...additionProps} option={option} cb={cb} />
    );
  }
};

export default Option;
