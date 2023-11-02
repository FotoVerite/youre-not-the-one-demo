import {
  Group,
  Blur,
  ColorMatrix,
  Paint,
  SkPoint,
  Fill,
  SkPath,
  Blend,
} from "@shopify/react-native-skia";
import { FC, PropsWithChildren, useMemo } from "react";
import Animated from "react-native-reanimated";

import { SHADER_TYPES, useShader } from "../../hooks/useShader";

export const Glitch: FC<
  PropsWithChildren & {
    resolution?: SkPoint;
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
        <Blur blur={2} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias (Offset)
            // prettier-ignore
            5, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 3, 0, 0,
            // prettier-ignore
            0, 0, 0, 24, -3,
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <Group clip={clip} color={"white"}>
      <Group
        layer={layer}
        blendMode={"exclusion"}
        transform={[{ translateX: -2 }]}
      >
        {children}
      </Group>
      {children}
    </Group>
  );
};
