import { SkImage } from "@shopify/react-native-skia";
import { Image } from "react-native";

export const isSkImage = (image?: Image | SkImage): image is SkImage => {
  return image != null && image.hasOwnProperty("dispose");
};
