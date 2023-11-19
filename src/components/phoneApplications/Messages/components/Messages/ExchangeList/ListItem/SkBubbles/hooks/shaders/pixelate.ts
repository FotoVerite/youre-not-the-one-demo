import { Skia } from "@shopify/react-native-skia";

export const pixelate = Skia.RuntimeEffect.Make(`
    uniform shader image;
    uniform float t;
    uniform vec2 iResolution;
	uniform float M_TWO_PI;

    vec4 main(vec2 fragCoord) {
    float y = (sin(t * M_TWO_PI * 0.1)) + 4;
    float pixelDimensionX = y;
    float pixelDimensionY = y + 1;
    vec2 cord = vec2(
        pixelDimensionX * floor(fragCoord.x / pixelDimensionX),
        pixelDimensionY * floor(fragCoord.y / pixelDimensionY)
    );
    return vec4(image.eval(cord).rgba);
    }`)!;
