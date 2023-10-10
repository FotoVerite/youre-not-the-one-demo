import { Skia } from "@shopify/react-native-skia";
import { getImageFromFs } from "src/utility/filesystem";

import { DigestedConversationListItem, MessagePayloadType } from "./types";
import {
  MESSAGE_CONTENT,
  isBackgroundSnapshot,
  isContentWithMeta,
  isSnapshot,
} from "../../contentWithMetaTypes";
import { produce } from "immer";

type SnapshotResolverType = {
  offset: number;
  arr: DigestedConversationListItem[];
};

export const resolveSnapshots = async (
  digestedExchanges: DigestedConversationListItem[]
) => {
  const resolver = new Promise<SnapshotResolverType>((resolve, reject) => {
    resolve({
      arr: [],
      offset: 0,
    });
  });
  const resolved = await digestedExchanges.reduce(
    resolveSnapshotAndUpdateOffset,
    resolver
  );
  return resolved.arr;
};

const resolveSnapshotAndUpdateOffset = async (
  memo: Promise<{
    offset: number;
    arr: DigestedConversationListItem[];
  }>,
  item: DigestedConversationListItem
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
      Skia.Data.fromBase64(base64String)
    );
    if (!image) {
      acc.arr.push(item);
      return acc;
    }
    const aspectRation = image.height() / image.width();
    const imageHeight = item.width * aspectRation;
    acc.offset += imageHeight;
    item.height = imageHeight;
    item.content = { ...item.content, ...{ image } };
  }
  acc.arr.push(item);
  return acc;
};

export const resolveSnapshotPayload =
  (width: number) =>
  async (memo: Promise<MessagePayloadType[]>, item: MessagePayloadType) => {
    const acc = await memo;
    if (!isSnapshot(item.messageContent)) {
      acc.push(item);
      return acc;
    }
    const base64String = await getImageFromFs(
      item.messageContent.content.filename
    );
    if (!base64String) {
      acc.push(item);
      return acc;
    }
    const image = Skia.Image.MakeImageFromEncoded(
      Skia.Data.fromBase64(base64String)
    );

    if (!image) {
      acc.push(item);
      return acc;
    }
    const mergedItem = produce(item, (draft) => {
      if (isContentWithMeta(draft.messageContent)) {
        const content = draft.messageContent.content as {
          filename: string;
          backup: string;
        };
        draft.messageContent.content = {
          ...content,
          ...{ image },
        };
      }
    });
    acc.push(mergedItem);
    return acc;
  };
