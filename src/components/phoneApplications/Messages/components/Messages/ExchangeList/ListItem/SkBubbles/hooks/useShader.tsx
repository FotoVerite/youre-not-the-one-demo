import {
  Skia,
  Shader,
  useClockValue,
  useComputedValue,
  vec,
  Fill,
  SkPoint,
  ImageShader,
  RuntimeShader,
  useImage,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

import { cloudsShader } from "./shaders/clouds";
import { crossSection } from "./shaders/crossSection";
import { ghost } from "./shaders/ghost";
import { glitchAndGlow } from "./shaders/glitchAndGlow";
import { osculatingLine } from "./shaders/oscilatingLine";
import { pixelate } from "./shaders/pixelate";

export enum SHADER_TYPES {
  CLOUDS,
  CROSS_SECTION,
  GHOST,
  GLITCH_AND_GLOW,
  PIXELATE,
  OSCULATING,
}

export const useShader = (
  shaderName?: SHADER_TYPES,
  resolution?: SkPoint,
  type?: "runtime" | "normal"
) => {
  const { width, height } = useWindowDimensions();
  const clock = useClockValue();
  const iResolution = vec(width, height);

  const M_PI = Math.PI,
    M_TWO_PI = 2 * M_PI;

  const uniforms = useComputedValue(
    () => ({
      t: clock.current * 0.0008,
      clipSize: 0.15,
      M_PI,
      M_TWO_PI,
      iResolution: resolution != null ? resolution : iResolution,
    }),
    [clock]
  );

  let source = cloudsShader;

  if (shaderName != null) {
    switch (shaderName) {
      case SHADER_TYPES.CLOUDS:
        source = cloudsShader;
        break;
      case SHADER_TYPES.CROSS_SECTION:
        source = crossSection;
        break;
      case SHADER_TYPES.GHOST:
        source = ghost;
        break;
      case SHADER_TYPES.GLITCH_AND_GLOW:
        source = glitchAndGlow;
        break;
      case SHADER_TYPES.OSCULATING:
        source = osculatingLine;
        break;
      case SHADER_TYPES.PIXELATE:
        source = pixelate;
        break;
      default:
        source = cloudsShader;
    }
  }

  if (!type) {
    return <Shader source={source} uniforms={uniforms} />;
  }
  switch (type) {
    case "normal":
      return <Shader source={source} uniforms={uniforms} />;
    case "runtime":
      return <RuntimeShader source={source} uniforms={uniforms} />;
    default:
      return <Shader source={source} uniforms={uniforms} />;
  }
};
