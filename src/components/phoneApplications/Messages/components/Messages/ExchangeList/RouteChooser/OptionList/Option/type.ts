import {
  OptionType,
  OptionTypeWithDisplayEffect,
  OptionTypeWithShaderEffect,
} from "@Components/phoneApplications/Messages/hooks/routes/types";
import { SharedValue } from "react-native-reanimated";

export interface AbstractOptionLabelType {
  cb: (value: string) => void;
  id: string;
  option: OptionType;
  setHeight: React.Dispatch<React.SetStateAction<SharedValue<number>[]>>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface BaseOptionLabelType extends AbstractOptionLabelType {}

export interface ShaderOptionLabelType extends AbstractOptionLabelType {
  option: OptionTypeWithShaderEffect;
}

export interface DisplayEffectOptionLabelType extends AbstractOptionLabelType {
  option: OptionTypeWithDisplayEffect;
}
