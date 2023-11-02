import { Skia } from "@shopify/react-native-skia";

// export const crossSection = Skia.RuntimeEffect.Make(`
//     uniform float M_PI;
//     uniform float M_TWO_PI;
//     uniform float t;
//     uniform vec2 iResolution;

//     vec4 main(vec2 FC) {
//         vec2 r =  2.0*vec2(FC.xy - 0.5*iResolution.xy)/iResolution.y;
//         float ret;
//         vec3 pixel = vec3(1);
//         ret = 1.0;
//         pixel = vec3(ret); // make a color out of return value.
//         return vec4(pixel, 1.0);
//     }`)!;
export const osculatingLine = Skia.RuntimeEffect.Make(`
    uniform float t;
    uniform vec2 iResolution;
	uniform float M_TWO_PI;
	vec3 blackCol = vec3(0.0); // black
	vec3 whiteCol = vec3(1.0); // white
	
	float disk(vec2 r, vec2 center, float radius) {
		float distanceFromCenter = length(r-center);
		float outsideOfDisk = smoothstep( radius - 0.005, radius+0.005, distanceFromCenter);
		float insideOfDisk = 1.0 - outsideOfDisk;
		return insideOfDisk;
	}

	vec3 oscillate(vec2 r){
		float xMax = iResolution.x/iResolution.y;	
      	vec2 q = r + vec2(xMax*2./5.,0.);
		vec3 ret = vec3(0.0);
		// oscillation
		float amplitude = 1;
		// y coordinate oscillates with a period of 0.5 seconds
		float y = amplitude*sin(0.5*t*M_TWO_PI);
		// radius oscillates too
		float radius = 0.15 + 0.05*sin(t*8.0);
		//return mix(ret, blackCol, radius);
		return mix(ret, whiteCol, r.y > y && r.y < y + 0.5 ? 1.0 : 0.0 );	
    }

    vec4 main(vec2 fragCoord) {
        vec2 r =  2.0*vec2(fragCoord.xy - 0.5*iResolution.xy)/iResolution.y;
		vec3 pixel = whiteCol;
		pixel = oscillate(r);
		return vec4(pixel, 1.0);
    }`)!;
