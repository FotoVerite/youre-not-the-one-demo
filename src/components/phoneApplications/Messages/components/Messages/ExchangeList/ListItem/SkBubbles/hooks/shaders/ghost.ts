import { Skia } from "@shopify/react-native-skia";

export const ghost = Skia.RuntimeEffect.Make(`
    uniform shader image;
    uniform float t;
    uniform vec2 iResolution;

    float random(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
    }

    vec4 main(vec2 fragCoord) {
        float flickerSpeed = 2.0;
        float flickerIntensity = 0.05;
        float flickerThreshold = 0.1;
        float ghostingIntensity = 0.5;
        vec2 center = iResolution.xy / 2.0;
        float radialDistance = length(fragCoord - center);

        float ghostingFactor = 0.98 + 0.08 * sin(t * 1.5); 

        // Apply ghosting effect
        vec4 colorCast = vec4(1, 0.0, 0.2, 0.3);
        vec2 oscillation = vec2(sin(t * 5.0), cos(t * 3));
        vec2 glitchOffset = oscillation * 10.0 + vec2(random(fragCoord), random(fragCoord + vec2(10.0)));
        vec4 glitchColor = image.eval(fragCoord + glitchOffset);

        half4 ghostPix = image.eval(mix(center, fragCoord, ghostingFactor)).rgba;
        if(ghostPix.a > 0.01) {
            ghostPix =  mix(colorCast, ghostPix, 0.5);
        } 
        vec3 colorShift = vec3(sin(t), cos(t), sin(t * 0.5));
        if(glitchColor.a > 0.01) {
            glitchColor.rgb += colorShift * 0.2;
        }
        if(random(fragCoord) > 0) {
            image.eval(fragCoord).rgba + glitchColor.rgba; 
        }
        else {
            return image.eval(fragCoord).rgba;
        }
        return image.eval(fragCoord).rgba + glitchColor.rgba;
    
    }`)!;
