import { AVPlaybackSource, AVPlaybackStatus, Audio } from "expo-av";
import { useEffect, useState } from "react";

type FoleyOptionsType = {
  positionToStop: number;
};

const generateStatusUpdateFunction =
  (soundObject: Audio.Sound, options: FoleyOptionsType) =>
  (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded stat
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (
        playbackStatus.isPlaying &&
        playbackStatus.positionMillis > options.positionToStop
      ) {
        soundObject.pauseAsync();
      }
    }
  };

export const useVideo = (
  source: AVPlaybackSource,
  options?: FoleyOptionsType
) => {
  const [soundObject, setSound] = useState<Audio.Sound | undefined>();

  async function loadSound(source: AVPlaybackSource) {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(source);
    if (options) {
      sound.setOnPlaybackStatusUpdate(
        generateStatusUpdateFunction(sound, options)
      );
    }
    setSound(sound);
  }

  useEffect(() => {
    loadSound(source);
    return soundObject
      ? () => {
          soundObject.unloadAsync();
        }
      : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return soundObject;
};
