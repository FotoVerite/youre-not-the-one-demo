import React, { FC } from "react";
import { Image, ImageSourcePropType, View, StyleSheet } from "react-native";
import { theme } from "src/theme";

export const Avatar: FC<{
  avatar?: ImageSourcePropType;
  addressee: boolean;
  paddingBottom: number;
}> = ({ addressee, avatar, paddingBottom }) => {
  if (!addressee) {
    return;
  }
  return (
    <View style={[styles.avatarContainer, { marginBottom: paddingBottom }]}>
      {avatar && <Image source={avatar} style={styles.avatar} />}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 30,
    height: 30,
    marginEnd: theme.spacing.p1,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: theme.BorderRadius.normal,
  },
});
