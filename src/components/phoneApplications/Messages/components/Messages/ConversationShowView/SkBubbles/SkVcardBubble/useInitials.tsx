import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { Skia, Circle, vec, Text } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { useFontsContext } from "src/contexts/fonts";

const useInitials = (
  width: number,
  height: number,
  name: MESSAGE_CONTACT_NAME,
  paddingBottom: number,
  circleColor: string = "white",
  fontColor: string = "black"
) => {
  const font = useFontsContext().fonts.HelveticaNeue;
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");
  const bubbleFontSize = initials.length === 1 ? 36 : 20;
  let bubbleFont = font;

  bubbleFont = useMemo(() => {
    const fontInstance = font.getTypeface();
    if (fontInstance != null) {
      return Skia.Font(fontInstance, bubbleFontSize);
    } else {
      return font;
    }
  }, [bubbleFontSize, font]);

  const middle = height / 2;
  const initialsWidth = bubbleFont.getTextWidth(initials);

  return (
    <>
      <Circle c={vec(width - 50, height / 2)} r={22} color={circleColor} />
      <Text
        x={30}
        y={middle + font.getSize() / 2}
        text={name}
        color={circleColor}
        font={font}
      />
      <Text
        x={width - 50 - initialsWidth / 2}
        y={middle + bubbleFontSize / 3.5}
        text={initials}
        color={fontColor}
        font={bubbleFont}
      />
    </>
  );
};

export default useInitials;
