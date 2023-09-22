import { useAnimatedObserver } from "@Components/phoneApplications/Messages/hooks/useSlideIn/useAnimatedObserver";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { StyleSheet, ViewStyle, useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "src/theme";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

const SlideInTransitionContainer: FC<
  {
    toObserve?: any;
    slideInfFrom?: "left" | "bottom";
    gutter?: number;
    viewOverrides?: ViewStyle;
  } & PropsWithChildren
> = ({ toObserve, children, gutter, slideInfFrom, viewOverrides }) => {
  const slideIn = useAnimatedObserver(toObserve);
  const { width, height } = useInsetDimensions();
  const { width: windowWith, height: windowHeight } = useWindowDimensions();
  const fromLeft = !slideInfFrom || slideInfFrom === "left";
  const gutterAmount = gutter || 0;

  const storedChildren = useRef(children);

  const animatedStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      slideIn.value,
      [0, 1],
      [fromLeft ? windowWith - gutterAmount : windowHeight - gutterAmount, 0]
    );
    if (fromLeft) {
      return { transform: [{ translateX: translate }] };
    } else {
      return { transform: [{ translateY: translate }] };
    }
  });

  useEffect(() => {
    if (toObserve != null) {
      storedChildren.current = children;
    }
  }, [children, toObserve]);

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
    backgroundColor: theme.colors.muted,
  },
});
