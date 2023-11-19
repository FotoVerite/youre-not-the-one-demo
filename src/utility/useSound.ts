import { AVPlaybackSource, Audio } from "expo-av";
import { useEffect, useState } from "react";

export const useSound = (source: AVPlaybackSource) => {
  const [soundObject, setSound] = useState<Audio.Sound | undefined>();

  async function loadSound(source: AVPlaybackSource) {
    const { sound } = await Audio.Sound.createAsync(source);
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
