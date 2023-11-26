import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Group } from "@shopify/react-native-skia";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import React, { FC, ReactNode, useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { theme } from "src/theme";

import { SkGradientBubbleWrapper } from "../SkGradientBubbleWrapper";
import { SkBubbleTypeWithGradient } from "../types";

type SkVideoBubbleType = Omit<SkBubbleTypeWithGradient, "content"> & {
  content: { video: string; subtitles: ReactNode[] };
};

export const SkVideoBubble: FC<SkVideoBubbleType> = (props) => {
  console.log(props.ID);
  //const glitchEffect = useGlitchEffect(height, width, content, clip);
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>();

  const updateStatus = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setStatus({ ...status });
    }
  }, []);

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
      <Video
        ref={video}
        style={{
          width: props.width - theme.spacing.p2,
          height: 160,
          position: "absolute",
          top: theme.spacing.p1,
          left: theme.spacing.p2,
        }}
        onLoad={(s) => video.current && video.current.playAsync()}
        source={props.content.video}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => updateStatus(status)}
        isLooping
        isMuted
      />
      <View
        style={{
          position: "absolute",
          top: theme.spacing.p1,
          right: theme.spacing.p1,
          zIndex: 3,
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
