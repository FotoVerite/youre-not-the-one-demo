import { Skia } from "@shopify/react-native-skia";

export const ghost = Skia.RuntimeEffect.Make(`
    uniform shader image;
    uniform float t;
    uniform vec2 iResolution;

    vec4 main(vec2 fragCoord) {
        float flickerSpeed = 2.0;
        float flickerIntensity = 0.05;
        float flickerThreshold = 0.1;
        float ghostingIntensity = 0.5;

        // Calculate the flicker factor using a sine function
        float flickerFactor =  0.98 + 0.02  * sin(t * flickerSpeed);
        // Get the pixel coordinates with flicker applied
        vec2 cord = vec2(
            fragCoord.x * flickerFactor,
            fragCoord.y * flickerFactor
        );

        // Apply flicker only to pixels above the flicker threshold
        vec4 flickerColor = vec4(0.0);
        if (flickerFactor > flickerThreshold) {
            flickerColor = image.eval(cord);
        }

        // Combine ghosting and flicker effects
        vec4 ghostingColor = mix(image.eval(fragCoord), flickerColor, ghostingIntensity);

        return ghostingColor;
    }`)!;
