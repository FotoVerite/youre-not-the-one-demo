import {
  Skia,
  Shader,
  useClockValue,
  useComputedValue,
  vec,
  Fill,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

export const useShader = () => {
  const { width } = useWindowDimensions();
  let clock = useClockValue();
  let iResolution = vec(width, width);

  let M_PI = Math.PI,
    M_TWO_PI = 2 * M_PI;

  const uniforms = useComputedValue(
    () => ({
      t: clock.current * 0.0008,
      M_PI,
      M_TWO_PI,
      iResolution,
    }),
    [clock]
  );

  const source = Skia.RuntimeEffect.Make(`
  uniform float M_PI;
  uniform float M_TWO_PI;
  uniform float t;
  uniform vec2 iResolution;
vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

vec4 main(vec2 FC) {
  float e=0,R=0,t=t,s;
  vec2 r = iResolution.xy;
  vec3 q=vec3(0,0,-1), p, d=vec3((FC.xy-.5*r)/r.y,.7);
  vec4 o=vec4(0);
  for(float i=0;i<100;++i) {
    o.rgb+=hsv(.1,e*.4,e/1e2)+.005;
    p=q+=d*max(e,.02)*R*.3;
    float py = (p.x == 0 && p.y == 0) ? 1 : p.y;
    p=vec3(log(R=length(p))-t,e=asin(-p.z/R)-1.,atan(p.x,py)+t/3.);
    s=1;
    for(int z=1; z<=9; ++z) {
      e+=cos(dot(sin(p*s),cos(p.zxy*s)))/s;
      s+=s;
    }
    i>50.?d/=-d:d;
  }
  return o;
}`)!;

  return (
    <Fill>
      <Shader source={source} uniforms={uniforms} />
    </Fill>
  );
};
