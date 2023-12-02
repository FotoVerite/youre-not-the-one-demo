import {
  OPTION_EFFECT_TYPE,
  OptionType,
  OptionTypeWithDisplayEffect,
  OptionTypeWithShaderEffect,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

export const isOptionDisplayEffect = (
  option: OptionType
): option is OptionTypeWithDisplayEffect => {
  return option.effect === OPTION_EFFECT_TYPE.DISPLAY_AFTER_OTHER_SELECTION;
};

export const isOptionShaderEffect = (
  option: OptionType
): option is OptionTypeWithShaderEffect => {
  return (
    option.effect != null &&
    [
      OPTION_EFFECT_TYPE.STATIC,
      OPTION_EFFECT_TYPE.GLITCH,
      OPTION_EFFECT_TYPE.MELT,
    ].includes(option.effect)
  );
};
