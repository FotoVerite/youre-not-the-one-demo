import { useEffect } from "react";
import { useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export const useAnimatedObserver = (watched: any, delay?: number) => {
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    if (watched != null) {
      sharedValue.value = withDelay(
        delay || 0,
        withTiming(1, { duration: 750 })
      );
    } else {
      sharedValue.value = withTiming(0, { duration: 750 });
    }
  }, [watched, sharedValue]);

  return sharedValue;
};
