import { Skia } from "@shopify/react-native-skia";
import { getBase64StringFromFs } from "src/utility/filesystem";
import { LOG, LOG_COLORS } from "src/utility/logger";

import { ImageCacheType, ImageType } from "./types";

export const imageResolver = async (filenames: string[]) => {
  const pairs = await Promise.all(filenames.map(resolveImage));
  return pairs.reduce((acc, info) => {
    acc[info.id] = info.image;
    return acc;
  }, {} as ImageCacheType);
};

const resolveImage = async (filename: string) => {
  const ret = { id: filename, image: undefined } as {
    id: string;
    image: ImageType;
  };
  const base64String = await getBase64StringFromFs(filename);
  if (!base64String) {
    LOG(LOG_COLORS.BgRed, "IMAGE WAS NOT SAVED IN THE CORRECT FORMAT");
    return ret;
  }
  const image = Skia.Image.MakeImageFromEncoded(
    Skia.Data.fromBase64(base64String)
  );
  ret.image = image;
  return ret;
};
