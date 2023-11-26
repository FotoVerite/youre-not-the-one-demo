import { OPTION_EFFECT_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";
import React, { FC, useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSound } from "src/utility/useSound";

import BaseOption from "./BaseOption";
import buzzer from "../assets/buzzer.mp3";
import staticBG from "../assets/static.gif";

const Option: FC<{
  cb: () => void;
  id: string;
  option: string;
  effect?: OPTION_EFFECT_TYPE;
  effectData?: string;
}> = ({ cb, effect, effectData, option }) => {
  const [display, setDisplay] = useState(false);
  const displayEffect = useCallback(() => {
    setDisplay(true);
  }, []);
  const sound = useSound(buzzer);
  if (display && effectData) {
    return <BaseOption value={effectData} noChevron background={staticBG} />;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if (effect == null) {
          cb();
        }
        if (effect != null) {
          sound?.playAsync();
          displayEffect();
        }
      }}
    >
      <BaseOption value={option} />
    </TouchableOpacity>
  );
};

export default Option;
