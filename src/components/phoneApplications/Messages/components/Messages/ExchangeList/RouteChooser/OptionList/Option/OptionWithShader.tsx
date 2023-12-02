import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSharedValue, SharedValue } from "react-native-reanimated";
import { useSound } from "src/utility/useSound";

import BaseOption from "./BaseOption";
import { ShaderOptionLabelType } from "./type";
import buzzer from "../assets/buzzer.mp3";
import staticBG from "../assets/static.gif";
import { OPTION_EFFECT_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { EFFECT_TYPE } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { SHADER_TYPES } from "../../../ListItem/SkBubbles/hooks/useShader";

const OptionWithShader: FC<ShaderOptionLabelType> = ({
  option,
  setHeight,
  setSelected,
}) => {
  const [display, setDisplay] = useState(false);

  const height = useSharedValue(50);
  useEffect(() => {
    setHeight((s) => s.concat(height));
  }, [height, setHeight]);

  const runEffect = useCallback(() => {
    setDisplay(true);
  }, []);

  const shaderEffect: {
    shader: SHADER_TYPES;
    color?: string;
    strokeColor?: string;
    background?: string;
    usePerlinNoise?: boolean;
  } = useMemo(() => {
    switch (option.effect) {
      case OPTION_EFFECT_TYPE.MELT:
        return {
          shader: SHADER_TYPES.GLITCH_AND_GLOW,
          color: "red",
          strokeColor: "black",
          usePerlinNoise: true,
        };
      case OPTION_EFFECT_TYPE.STATIC:
        return { shader: SHADER_TYPES.GHOST, background: staticBG };
      default:
        return { shader: SHADER_TYPES.GHOST, background: staticBG };
    }
  }, [option.effect]);

  const sound = useSound(buzzer);
  if (display) {
    return (
      <View>
        <BaseOption value={option.data} noChevron {...shaderEffect} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        sound?.playAsync();
        setSelected((s) => s.concat(option.value));
        runEffect();
      }}
    >
      <BaseOption value={option.value} />
    </TouchableOpacity>
  );
};

export default OptionWithShader;
