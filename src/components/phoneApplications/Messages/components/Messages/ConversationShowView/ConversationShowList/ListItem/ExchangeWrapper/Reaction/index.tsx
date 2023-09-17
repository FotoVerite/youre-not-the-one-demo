import { FontAwesomeGlyphs } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { FC, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Ellipse } from "react-native-svg";

type PropsType = {
  reactionAnimated: boolean;
  reactionColor?: string;
  addressee: boolean;
  reactionName?: FontAwesomeGlyphs;
  reactionDelay?: number;
  colors: string[];
};
const Reaction: FC<PropsType> = ({
  reactionAnimated,
  colors,
  reactionDelay,
  addressee,
  reactionColor,
  reactionName,
}) => {
  const scale = useSharedValue(reactionAnimated ? 0 : 0.8);
  useEffect(() => {
    scale.value = withDelay(
      reactionDelay || 1000,
      withSpring(0.8, { overshootClamping: false, stiffness: 250 })
    );
  }, [reactionAnimated, reactionDelay, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    if (reactionAnimated) {
      return { transform: [{ scale: scale.value }] };
    } else {
      return {};
    }
  }, [reactionAnimated]);

  if (!reactionName) {
    return;
  }

  return (
    <Animated.View
      style={[
        styles.reaction,
        {
          left: addressee ? undefined : -20,
          top: -15,
          right: addressee ? -15 : undefined,
          transform: [{ scaleX: -0.8 }, { scaleY: 0.8 }],
        },
        animatedStyle,
      ]}
    >
      <View style={{ transform: [{ scaleX: addressee ? -1 : 1 }] }}>
        <Svg viewBox="27.303 21.379 116.792 122.135" width={36} height={36}>
          <Ellipse
            cx={79.957}
            cy={73.086}
            rx={51.461}
            ry={51.461}
            fill={colors[1] || "#000aaa"}
            stroke="transparent"
          />
          <Ellipse
            cx={116.915}
            cy={114.09}
            rx={14.267}
            ry={14.267}
            fill={colors[1] || "#000aaa"}
            stroke="transparent"
          />
          <Ellipse
            cx={137.97}
            cy={136.633}
            rx={6.208}
            ry={6.208}
            fill={colors[1] || "#000aaa"}
            stroke="transparent"
          />
        </Svg>
      </View>
      <FontAwesome
        name={reactionName}
        color={reactionColor}
        size={16}
        style={[
          styles.icon,
          {
            left: addressee ? undefined : 8,
            right: addressee ? 8 : undefined,
          },
        ]}
      />
    </Animated.View>
  );
};
export default Reaction;

const styles = StyleSheet.create({
  reaction: {
    position: "absolute",
    zIndex: 2,
    top: -10,
  },
  icon: {
    position: "absolute",
    top: 8,
  },
});
