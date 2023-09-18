import { useAnimatedObserver } from "@Components/phoneApplications/Messages/hooks/useSlideIn/useAnimatedObserver";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

const SlideInTransitionContainer: FC<
  {
    toObserve?: any;
    slideInfFrom?: "left" | "bottom";
    viewOverrides?: ViewStyle;
  } & PropsWithChildren
> = ({ toObserve, children, slideInfFrom, viewOverrides }) => {
  const slideIn = useAnimatedObserver(toObserve);
  const { width, height } = useInsetDimensions();

  const storedChildren = useRef(children);

  const animatedStyle = useAnimatedStyle(() => {
    const translate = interpolate(slideIn.value, [0, 1], [width, 0]);
    if (!slideInfFrom || slideInfFrom === "left") {
      return { transform: [{ translateX: translate }] };
    } else {
      return { transform: [{ translateY: translate }] };
    }
  });

  useEffect(() => {
    if (toObserve != null) {
      storedChildren.current = children;
    }
  }, [toObserve]);

  return (
    <Animated.View
      style={[{ width, height }, styles.screen, viewOverrides, animatedStyle]}
    >
      {toObserve ? children : storedChildren.current}
    </Animated.View>
  );
};

export default SlideInTransitionContainer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "absolute",
  },
});
