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
  const displayEffect = useCallback(
    (effectData) => {
      setDisplay((d) => !d);
    },
    [effect]
  );
  const sound = useSound(buzzer);

  return (
    <TouchableOpacity
      onPress={() => {
        if (effect == null) {
          cb();
        }
        if (effect != null) {
          console.log("played");
          sound?.playAsync();
          displayEffect(effectData);
        }
      }}
    >
      {!display && <BaseOption value={option} />}
      {display && (
        <BaseOption
          value="THis is a bad end THis is a bad end"
          noChevron={true}
          background={staticBG}
        />
      )}
    </TouchableOpacity>
  );
};

export default Option;
