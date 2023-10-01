import { useEffect } from "react";
import {
  Easing,
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export const useAnimatedObserver = (
  watched: any,
  resolver?: SharedValue<number>,
  delay?: number,
  storedChildren?: React.MutableRefObject<React.ReactNode>
) => {
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    if (watched != null) {
      sharedValue.value = withDelay(
        delay || 0,
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.quad) })
      );
    } else {
      sharedValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
      });
    }
  }, [watched, sharedValue, delay, storedChildren]);

  useAnimatedReaction(
    () => {
      return sharedValue.value;
    },
    (result, previous) => {
      if (resolver && result !== previous) {
        resolver.value = result;
      }
    },
    []
  );

  return sharedValue;
};
