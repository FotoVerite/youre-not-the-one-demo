import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Group } from "@shopify/react-native-skia";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "src/theme";

import { SkGradientBubbleWrapper } from "../SkGradientBubbleWrapper";
import { SkBubbleTypeWithGradient } from "../types";
import { duration } from "moment";

type SkVideoBubbleType = Omit<SkBubbleTypeWithGradient, "content"> & {
  content: { video: string; subtitles: ReactNode[] };
};

export const SkVideoBubble: FC<SkVideoBubbleType> = (props) => {
  //const glitchEffect = useGlitchEffect(height, width, content, clip);
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>();
  const [visible, setVisible] = useState(false);
  const { height } = useWindowDimensions();
  const opacity = useSharedValue(1);

  const { offset, scrollHandler } = props;

  const updateStatus = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatus({ ...status });
    }
  }, []);

  useEffect(() => {
    if (status && visible) {
      opacity.value = withTiming(1, { duration: 1000 });
    } else {
      opacity.value = 0;
    }
  }, [opacity, status, visible]);

  useAnimatedReaction(
    () => {
      return offset - scrollHandler.value;
    },
    (fromTop) => {
      if (fromTop > -100 && fromTop < height) {
        runOnJS(setVisible)(true);
      } else {
        runOnJS(setVisible)(false);
      }
    },
    []
  );

  return (
    <>
      <SkGradientBubbleWrapper {...props}>
        <Group
          color="white"
          transform={[{ translateY: 160 }, { translateX: 6 }]}
        >
          {props.content.subtitles}
        </Group>
        {/* {effect?.type === EFFECT_TYPE.GLITCH && glitchEffect} */}
      </SkGradientBubbleWrapper>

      <Animated.View
        style={{
          width: props.width - theme.spacing.p2,
          height: 160,
          position: "absolute",
          top: theme.spacing.p1,
          left: theme.spacing.p2,
          opacity: opacity,
        }}
      >
        {visible && (
          <Video
            ref={video}
            style={{
              width: props.width - theme.spacing.p2,
              height: 160,
            }}
            onLoad={(s) => video.current && video.current.playAsync()}
            source={props.content.video}
            useNativeControls={false}
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={(status) => updateStatus(status)}
            isLooping
            isMuted
          />
        )}
      </Animated.View>

      <View
        style={{
          position: "absolute",
          top: theme.spacing.p1,
          right: theme.spacing.p1,
          zIndex: 3,
          opacity: 1,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (!status) {
              return;
            }
            if (status.isMuted) {
              video.current
                ?.setIsMutedAsync(false)
                .then((result) => video.current?.setPositionAsync(0));
            }
            if (!status.isMuted) {
              video.current?.setIsMutedAsync(true);
            }
          }}
        >
          <Icon
            name={status?.isMuted ? "volume-mute" : "volume-high"}
            color="#DDD"
            size={24}
            style={{}}
          />
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
