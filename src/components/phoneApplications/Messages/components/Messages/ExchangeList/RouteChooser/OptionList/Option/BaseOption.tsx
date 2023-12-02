import { getWidthFromGlyphs } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/SkFunctions/skiaCalculations";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Canvas,
  Group,
  Paint,
  Text as SkText,
  vec,
} from "@shopify/react-native-skia";
import React, { FC, PropsWithChildren } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFontsContext } from "src/contexts/fonts";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

import { PerlinNoiseFilter } from "./PerlinNoiseFilter";
import {
  SHADER_TYPES,
  useShader,
} from "../../../ListItem/SkBubbles/hooks/useShader";
import { BlackoutAndShrink } from "../Effects/BlackoutAndShrink";

type OptionTextType = {
  value: string;
  shader?: SHADER_TYPES;
  color?: string;
  strokeColor?: string;
  usePerlinNoise?: boolean;
};
const OptionText: FC<OptionTextType> = ({
  color,
  shader,
  strokeColor,
  value,
  usePerlinNoise,
}) => {
  const font = useFontsContext().fonts.HelveticaNeue;
  const width = getWidthFromGlyphs(font, value);
  const skShader = useShader(shader, vec(width, 50), "runtime");
  color = color || "black";
  if (!shader || !font) {
    return <Text style={styles.content}>{value}</Text>;
  }
  return (
    <Canvas style={{ flex: 1, height: 50 }}>
      <Group>
        {skShader}
        <SkText x={16} y={30} text={value} font={font} color={color}>
          {strokeColor && (
            <Paint color="black" style="stroke" strokeWidth={0.5}>
              {usePerlinNoise && <PerlinNoiseFilter />}
            </Paint>
          )}
        </SkText>
        {usePerlinNoise && <PerlinNoiseFilter />}
      </Group>
    </Canvas>
  );
};

const BaseOption: FC<
  {
    background?: ImageSourcePropType;
    value: string;
    noChevron?: boolean;
  } & OptionTextType
> = (props) => {
  const { background, noChevron, value, shader, ...optionTextProps } = props;
  if (background) {
    return (
      <Row style={styles.container}>
        <BlackoutAndShrink />
        <ImageBackground source={background} style={styles.content}>
          <Row style={styles.infoRow}>
            <Row>
              <OptionText value={value} shader={shader} {...optionTextProps} />
              {!noChevron && (
                <FontAwesome
                  name="chevron-right"
                  color="black"
                  size={24}
                  style={styles.icon}
                />
              )}
            </Row>
          </Row>
        </ImageBackground>
      </Row>
    );
  }

  return (
    <Row style={styles.container}>
      {shader && <BlackoutAndShrink />}
      <View style={styles.content}>
        <Row style={styles.infoRow}>
          <Row>
            <OptionText value={value} shader={shader} {...optionTextProps} />
            {!noChevron && (
              <FontAwesome
                name="chevron-right"
                color="black"
                size={24}
                style={styles.icon}
              />
            )}
          </Row>
        </Row>
      </View>
    </Row>
  );
};

export default BaseOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebebed",
    borderRadius: theme.BorderRadius.small,
    alignItems: "center",
    height: 50,
  },
  content: {
    flex: 1,
    paddingVertical: theme.spacing.p1 / 2,
    paddingHorizontal: theme.spacing.p1,
    fontSize: 16,
    marginStart: theme.spacing.p1 / 2,
  },
  infoRow: {
    flexGrow: 0,
  },
  icon: {
    alignSelf: "center",
    marginStart: "auto",
  },
});
