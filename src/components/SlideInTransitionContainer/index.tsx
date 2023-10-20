import { useAnimatedObserver } from "@Components/phoneApplications/Messages/hooks/useSlideIn/useAnimatedObserver";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { StyleSheet, ViewStyle, useWindowDimensions } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedReaction,
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
    resolver?: SharedValue<number>;
  } & PropsWithChildren
> = ({
  toObserve,
  children,
  gutter,
  resolver,
  slideInfFrom,
  viewOverrides,
}) => {
  const storedChildren = useRef(children);

  const slideIn = useAnimatedObserver(
    toObserve,
    resolver,
    undefined,
    storedChildren,
  );
  const { width, height } = useInsetDimensions();
  const { width: windowWith, height: windowHeight } = useWindowDimensions();
  const fromLeft = !slideInfFrom || slideInfFrom === "left";
  const gutterAmount = gutter || 0;

  const animatedStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      slideIn.value,
      [0, 1],
      [fromLeft ? windowWith : windowHeight, 0 + gutterAmount],
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
      style={[
        { width, height: height - gutterAmount },
        styles.screen,
        viewOverrides,
        animatedStyle,
      ]}
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
