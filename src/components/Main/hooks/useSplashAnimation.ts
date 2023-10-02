import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

export type AppResolverCallbackType = (
  resolved: "storage" | "fonts",
  value: boolean,
) => void;
export type AppResolverType = Record<"storage" | "fonts", boolean>;
const useSplashAnimation = () => {
  const [appResolver, _setAppResolver] = useState<AppResolverType>({
    storage: false,
    fonts: false,
  });
  const [animationFinished, setAnimationFinished] = useState(false);

  const opacity = useSharedValue(1);

  const setAppResolver = useCallback(
    (key: "storage" | "fonts", value: boolean) => {
      _setAppResolver((state) => {
        return { ...state, ...{ [key]: value } };
      });
    },
    [_setAppResolver],
  );

  useEffect(() => {
    const process = async () => {
      const isFinished = !Object.values(appResolver).includes(false);
      if (isFinished) {
        await SplashScreen.hideAsync();

        opacity.value = withTiming(0, { duration: 500 }, () =>
          runOnJS(setAnimationFinished)(true),
        );
      }
    };
    process();
  }, [appResolver, opacity]);

  return [setAppResolver, animationFinished, opacity] as const;
};

export default useSplashAnimation;
