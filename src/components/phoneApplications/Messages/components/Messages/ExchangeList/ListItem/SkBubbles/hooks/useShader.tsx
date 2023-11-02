import {
  Skia,
  Shader,
  useClockValue,
  useComputedValue,
  vec,
  Fill,
  SkPoint,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { cloudsShader } from "./shaders/clouds";
import { crossSection } from "./shaders/crossSection";
import { osculatingLine } from "./shaders/oscilatingLine";
export enum SHADER_TYPES {
  CLOUDS,
  CROSS_SECTION,
  OSCULATING,
}

export const useShader = (shaderName?: SHADER_TYPES, resolution?: SkPoint) => {
  const { width, height } = useWindowDimensions();
  const clock = useClockValue();
  const iResolution = vec(width, height);

  let M_PI = Math.PI,
    M_TWO_PI = 2 * M_PI;

  const uniforms = useComputedValue(
    () => ({
      t: clock.current * 0.0008,
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
      case SHADER_TYPES.OSCULATING:
        source = osculatingLine;
        break;
      default:
        source = cloudsShader;
    }
  }

  return <Shader source={source} uniforms={uniforms} />;
};
