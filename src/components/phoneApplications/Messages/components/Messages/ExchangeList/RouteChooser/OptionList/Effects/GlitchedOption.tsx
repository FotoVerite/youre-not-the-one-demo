import React, { FC } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

import BaseOption from "../Option/BaseOption";
import background from "../assets/static.gif";

const GlitchedOption: FC<{
  text: string;
}> = ({ text }) => {
  return (
    <BaseOption>
      <ImageBackground source={background} style={{ flex: 1 }}>
        <Text style={styles.content}>TESTTTS</Text>
      </ImageBackground>
    </BaseOption>
  );
};

export default GlitchedOption;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    fontSize: 16,
    marginStart: theme.spacing.p1 / 2,
  },
  icon: {
    marginStart: "auto",
  },
  dateRow: {
    alignItems: "center",
  },
});
