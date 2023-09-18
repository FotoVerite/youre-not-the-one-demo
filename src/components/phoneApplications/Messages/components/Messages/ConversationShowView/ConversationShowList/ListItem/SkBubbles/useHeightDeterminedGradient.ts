import { useWindowDimensions } from "react-native";
import {
  useDerivedValue,
  interpolateColor,
  SharedValue,
} from "react-native-reanimated";

export const useHeightDeterminedGradient = (
  colors: string[],
  offset: number,
  darker: boolean,
  scrollHandler: SharedValue<number>
) => {
  const COLOR_CHANGE_HEIGHT = useWindowDimensions().height / 2;
  const currentlyFromTop = useDerivedValue(() => {
    return Math.max(
      0,
      Math.min(offset - scrollHandler.value, COLOR_CHANGE_HEIGHT)
    );
  }, [scrollHandler]);

  const darkenedColor1 = changeColor(colors[0], darker ? -100 : -25);
  const darkenedColor2 = changeColor(colors[1], darker ? -100 : 20);

  const computedColors = useDerivedValue(() => {
    const color1 = interpolateColor(
      currentlyFromTop.value,
      [0, COLOR_CHANGE_HEIGHT],
      [colors[0], darkenedColor1]
    );

    const color2 = interpolateColor(
      currentlyFromTop.value,
      [0, COLOR_CHANGE_HEIGHT],
      [colors[1], darkenedColor2]
    );
    return [color1, color2];
  }, [currentlyFromTop.value]);

  return computedColors;
};

const changeColor = (color: string, amount: number) => {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 0xff);
  const fill = (str: string) => ("00" + str).slice(-2);

  const num = parseInt(color.substr(1), 16);
  const red = clamp((num >> 16) + amount);
  const green = clamp(((num >> 8) & 0x00ff) + amount);
  const blue = clamp((num & 0x0000ff) + amount);
  return (
    "#" +
    fill(red.toString(16)) +
    fill(green.toString(16)) +
    fill(blue.toString(16))
  );
};
