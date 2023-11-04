import {
  Group,
  Blur,
  ColorMatrix,
  Paint,
  SkPoint,
  Fill,
  SkPath,
  Blend,
  Mask,
  Circle,
} from "@shopify/react-native-skia";
import { FC, PropsWithChildren, useMemo } from "react";
import Animated from "react-native-reanimated";

import { SHADER_TYPES, useShader } from "../../hooks/useShader";

export const Glitch: FC<
  PropsWithChildren & {
    resolution?: SkPoint;
    colors: string[];
    clip: Readonly<Animated.SharedValue<SkPath>>;
  }
> = ({ children, clip, resolution }) => {
  const shader = useShader(SHADER_TYPES.CROSS_SECTION, resolution);
  const o = useShader(SHADER_TYPES.OSCULATING, resolution);

  const clouds = useShader(SHADER_TYPES.CLOUDS, resolution);

  const layer = useMemo(() => {
    return (
      <Paint>
        {/* pixelOpacity > blurredOpacity * 60 - 30 */}
        <Blur blur={1} />

        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias (Offset)
            // prettier-ignore
            1, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 5, 5, 0,
            // prettier-ignore
            2, 0, 1, 3, 0,
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <Group clip={clip} blendMode="xor" layer={layer} opacity={0.35}>
      <Mask mode="luminance" mask={<Fill>{o}</Fill>}>
        <Group transform={[{ translateX: -2 }, { translateY: -2 }]}>
          {children}
        </Group>
      </Mask>
    </Group>
  );
};
