import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

const UseSplashScreen = () => {
  const [kickoff, setKickoff] = useState(false);

  const opacity = useSharedValue(1);

  useEffect(() => {
    const process = async () => {
      if (kickoff) {
        await SplashScreen.hideAsync();

        opacity.value = withTiming(0, { duration: 500 });
      }
    };
    process();
  }, [kickoff, opacity]);

  const fadeOutSplashScreen = useCallback(() => {
    setKickoff(true);
  }, [setKickoff]);

  return [fadeOutSplashScreen, opacity] as const;
};

export default UseSplashScreen;
