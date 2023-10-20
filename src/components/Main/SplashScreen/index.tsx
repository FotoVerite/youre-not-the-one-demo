import { Asset, useAssets } from "expo-asset";
import Constants from "expo-constants";
import { FC, useState, useEffect, PropsWithChildren } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import { LOG, LOG_COLORS } from "src/utility/logger";

import UseSplashScreen from "./useSplashScreen";

export const SplashScreen: FC<
  PropsWithChildren & {
    resolved: boolean;
  }
> = ({ children, resolved }) => {
  const uri = Constants.expoConfig?.splash?.image;
  const [isSplashReady, setSplashReady] = useState(false);
  const [assets] = useAssets([require("assets/splash.jpeg")]);
  const [kickoff, opacity] = UseSplashScreen();

  useEffect(() => {
    async function prepare(asset: Asset) {
      await asset.downloadAsync();
      setSplashReady(true);
    }
    if (assets && assets[0]) prepare(assets[0]);
  }, [assets]);

  useEffect(() => {
    if (isSplashReady && resolved) {
      kickoff();
    }
  }, [isSplashReady, kickoff, resolved]);

  if (uri == null) {
    LOG(LOG_COLORS.FgRed, "SPLASH SCREEN NOT SET UP");
  }

  if (!isSplashReady || !assets) {
    return null;
  }

  const image = assets[0];

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            position: "absolute",
            zIndex: 10000,
            backgroundColor: Constants.expoConfig?.splash?.backgroundColor,
          },
          { opacity },
        ]}
      >
        <Animated.Image
          style={[
            styles.image,
            {
              resizeMode: Constants.expoConfig?.splash?.resizeMode || "contain",
            },
          ]}
          source={image as ImageSourcePropType}
          fadeDuration={0}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({ image: { width: "100%", height: "100%" } });
