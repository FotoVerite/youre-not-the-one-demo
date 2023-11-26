import { getWidthFromGlyphs } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/SkFunctions/skiaCalculations";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Canvas, Group, Text as SkText, vec } from "@shopify/react-native-skia";
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

import {
  SHADER_TYPES,
  useShader,
} from "../../../ListItem/SkBubbles/hooks/useShader";
import { BlackoutAndShrink } from "../Effects/BlackoutAndShrink";

const OptionText: FC<{ value: string; shader?: string }> = ({
  shader,
  value,
}) => {
  const font = useFontsContext().fonts.HelveticaNeue;
  const width = getWidthFromGlyphs(font, value);
  const skShader = useShader(SHADER_TYPES.GHOST, vec(width, 50), "runtime");
  if (!shader || !font) {
    return <Text style={styles.content}>{value}</Text>;
  }
  return (
    <Canvas style={{ flex: 1, height: 50 }}>
      <Group>
        {skShader}
        <SkText x={16} y={30} text={value} font={font} color={"black"} />
      </Group>
    </Canvas>
  );
};

const BaseOption: FC<
  {
    background?: ImageSourcePropType;
    shader?: string;
    value: string;
    noChevron?: boolean;
  } & PropsWithChildren
> = ({ background, children, noChevron, value, shader }) => {
  if (background) {
    return (
      <Row style={styles.container}>
        <BlackoutAndShrink />
        <ImageBackground source={background} style={styles.content}>
          <Row style={styles.infoRow}>
            <Row>
              <OptionText value={value} shader={SHADER_TYPES.PIXELATE} />
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
      <View style={styles.content}>
        <Row style={styles.infoRow}>
          <Row>
            <Text style={styles.content}>{value}</Text>
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
