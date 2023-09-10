import { SkImage } from "@shopify/react-native-skia";
import * as FileSystem from "expo-file-system";

import { LOG, LOG_COLORS } from "./logger";

enum DIRECTORIES {
  IMAGE_DIR = `images/`,
}

const _convertibleToBase64 = (file: string | SkImage): file is SkImage => {
  return Object.keys(file).includes("encodeToBase64");
};

export const writeToFile = async (
  dir: string,
  file: string | SkImage,
  fileName: string,
) => {
  await ensureDirExists(dir);
  if (_convertibleToBase64(file)) {
    await FileSystem.writeAsStringAsync(
      createPath(dir, fileName),
      file.encodeToBase64(),
      {
        encoding: FileSystem.EncodingType.Base64,
      },
    );
  } else {
    await FileSystem.writeAsStringAsync(createPath(dir, fileName), file, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  }
};

export const ensureDirExists = async (dir: string) => {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
};

export const createPath = (dir: string, filename: string) => {
  return `${dir}/${filename}.png`;
};

export const writeImageToFs = async (file: SkImage, filename: string) => {
  const dir = FileSystem.documentDirectory + DIRECTORIES.IMAGE_DIR;
  LOG(LOG_COLORS.FgBlue, `Writing image ${filename}`);
  writeToFile(dir, file, filename);
};
