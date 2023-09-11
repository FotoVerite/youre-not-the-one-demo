import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useInsetDimensions = () => {
  const { width, height } = useWindowDimensions();
  const { top, bottom, left, right } = useSafeAreaInsets();

  return {
    width: width - left - right,
    height: height - top - bottom,
  };
};
