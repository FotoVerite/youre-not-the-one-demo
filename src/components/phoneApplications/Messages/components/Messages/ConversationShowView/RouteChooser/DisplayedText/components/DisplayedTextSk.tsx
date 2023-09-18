import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import {
  Vector,
  SkFont,
  interpolateColors,
  Canvas,
  Group,
  vec,
  Text,
  Rect,
  LinearGradient,
} from "@shopify/react-native-skia";
import { FC, ReactElement, useEffect } from "react";
import {
  SharedValue,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useBubbleClip } from "../../../ConversationShowList/ListItem/SkBubbles/useBubbleClip";

export const DisplayedTextSk: FC<{
  numberOfLines: number;
  width: number;
  nodes: ReactElement[];
  cursorVector: Vector;
  font: SkFont;
  sent: SharedValue<number>;
  visibility: SharedValue<number>;
}> = ({
  sent,
  numberOfLines,
  width,
  nodes,
  cursorVector,
  font,
  visibility,
}) => {
  const blink = useSharedValue(-0.2);

  useEffect(() => {
    blink.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, [blink]);

  const textColor = useDerivedValue(() => {
    return interpolateColors(sent.value, [0, 1], ["black", "white"]);
  }, [sent]);

  const textTranslateX = useDerivedValue(() => {
    return [{ translateX: interpolate(sent.value, [0, 1], [-8, 0]) }];
  }, [sent]);

  const cursorOpacity = useDerivedValue(() => {
    return interpolate(sent.value, [0, 1], [1, 0]);
  }, [sent]);

  const bubbleVisible = useDerivedValue(() => {
    return interpolate(sent.value, [0, 0.5, 1], [0, 0, 1]);
  }, [sent]);

  const clip = useBubbleClip(width, numberOfLines + 15, 16, false, 0);

  return (
    <Canvas
      style={{
        height: numberOfLines + 15,
        width,
      }}
    >
      <Group opacity={visibility}>
        <Group clip={clip} opacity={bubbleVisible}>
          <Rect x={0} y={0} width={width} height={numberOfLines + 15}>
            <LinearGradient
              colors={MESSAGE_CONTACT_INFO[MESSAGE_CONTACT_NAME.SELF].colors}
              start={vec(0, 0)}
              end={vec(0, numberOfLines + 15)}
            />
          </Rect>
        </Group>

        <Group color={textColor} transform={textTranslateX}>
          {nodes}
        </Group>

        <Group opacity={cursorOpacity} transform={[{ translateX: -8 }]}>
          <Text
            x={cursorVector.x}
            y={cursorVector.y}
            font={font}
            text="|"
            color="blue"
            opacity={blink}
          />
        </Group>
      </Group>
    </Canvas>
  );
};
