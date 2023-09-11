import { Skia } from "@shopify/react-native-skia";
import { getImageFromFs } from "src/utility/filesystem";

import { DigestedConversationListItem } from "./types";
import { MESSAGE_CONTENT } from "../../contentWithMetaTypes";

type SnapshotResolverType = {
  offset: number;
  arr: DigestedConversationListItem[];
};
export const resolveSnapshots = async (
  digestedExchanges: DigestedConversationListItem[],
) => {
  const resolver = new Promise<SnapshotResolverType>((resolve, reject) => {
    resolve({
      arr: [],
      offset: 0,
    });
  });
  const resolved = await digestedExchanges.reduce(
    resolveSnapshotAndUpdateOffset,
    resolver,
  );
  return resolved.arr;
};

const resolveSnapshotAndUpdateOffset = async (
  memo: Promise<{
    offset: number;
    arr: DigestedConversationListItem[];
  }>,
  item: DigestedConversationListItem,
) => {
  const acc = await memo;
  if (
    item.type !== MESSAGE_CONTENT.SNAPSHOT &&
    item.type !== MESSAGE_CONTENT.BACKGROUND_SNAPSHOT
  ) {
    item.offset += acc.offset;
    acc.arr.push(item);
    return acc;
  } else {
    const base64String = await getImageFromFs(item.content.filename);
    if (!base64String) {
      acc.arr.push(item);
      return acc;
    }
    const image = Skia.Image.MakeImageFromEncoded(
      Skia.Data.fromBase64(base64String),
    );
    if (!image) {
      acc.arr.push(item);
      return acc;
    }
    const aspectRation = image.height() / image.width();
    const imageHeight = item.width * aspectRation;
    acc.offset += imageHeight;
    item.height = imageHeight;
    item.content.image = image;
  }
  acc.arr.push(item);
  return acc;
};
