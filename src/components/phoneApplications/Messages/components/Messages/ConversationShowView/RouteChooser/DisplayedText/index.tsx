import { generateSkiaNode } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/SkFunctions/skiaCalculations";
import { FC, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useFontsContext } from "src/contexts/fonts";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import { DisplayedTextSk } from "./components/DisplayedTextSk";

export enum DISPLAYED_TEXT_STATES {
  DISPLAYED,
  SENT,
}

const DisplayedText: FC<{
  text: string;
  state: DISPLAYED_TEXT_STATES;
  cb: () => void;
}> = ({ cb, state, text }) => {
  const { height, width } = useInsetDimensions();
  const fontContext = useFontsContext();

  const sent = useSharedValue(0);
  const visibility = useSharedValue(0);

  const blurAndRemove = useCallback(() => {
    "worklet";
    visibility.value = withTiming(0, {}, (finished) => {
      if (finished && cb) {
        runOnJS(cb)();
      }
    });
  }, [cb, visibility]);

  useEffect(() => {
    visibility.value = withTiming(1);
  }, [visibility]);

  useEffect(() => {
    switch (state) {
      case DISPLAYED_TEXT_STATES.DISPLAYED:
        sent.value = withTiming(0);
        break;
      case DISPLAYED_TEXT_STATES.SENT:
        sent.value = withTiming(
          1,
          { easing: Easing.out(Easing.circle) },
          () => {
            blurAndRemove();
          }
        );
        break;
      default:
        sent.value = withTiming(0);
        break;
    }
  }, [state, sent, visibility, blurAndRemove]);

  const [numberOfLines, textWidth, nodes, cursorVectors] = generateSkiaNode(
    fontContext.fonts.HelveticaNeue,
    fontContext.fonts.NotoColor,
    text,
    width - 78,
    false
  );

  const textAnimation = useAnimatedStyle(() => {
    return {
      opacity: visibility.value,
      left: interpolate(sent.value, [0, 1], [0, width - textWidth - 44]),
    };
  }, [sent, visibility, textWidth]);

  const containerAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(visibility.value, [1, 0], [numberOfLines + 15, 35]),
    };
  }, [visibility, numberOfLines]);

  return (
    <>
      <Animated.View style={[styles.skText, textAnimation]}>
        <DisplayedTextSk
          sent={sent}
          numberOfLines={numberOfLines}
          width={textWidth}
          nodes={nodes}
          cursorVector={cursorVectors}
          font={fontContext.fonts.SFPro}
          visibility={visibility}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            flexGrow: 1,
            minHeight: 35,
          },
          containerAnimation,
        ]}
      />
    </>
  );
};

export default DisplayedText;

const styles = StyleSheet.create({
  skText: {
    flexShrink: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    zIndex: 4,
  },
});
