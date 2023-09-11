import { SkFont, useFont } from "@shopify/react-native-skia";
type skFontNames = "SFPro" | "NotoColor" | "HelveticaNeue";
export type skFontRecords = Record<skFontNames, SkFont>;

export const useFonts = () => {
  const SFPro = useFont(require("../assets/SFPro.ttf"), 16);
  const NotoColor = useFont(require("../assets/NotoColorEmoji.ttf"), 16);
  const HelveticaNeue = useFont(require("../assets/HelveticaNeue.ttf"), 16);

  if (!SFPro || !NotoColor || !HelveticaNeue) {
    return undefined;
  }
  const skFontRecord: skFontRecords = {
    SFPro,
    NotoColor,
    HelveticaNeue,
  };
  return skFontRecord;
};
