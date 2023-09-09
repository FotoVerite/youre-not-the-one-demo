import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import * as FileSystem from "expo-file-system";
import { SkImage, makeImageFromView } from "@shopify/react-native-skia";
import {
  SNAPSHOT_TYPES,
  SnapShotContextDigestType,
  SnapShotContextDigestedType,
  SnapShotImageType,
  TakeSnapshotType,
} from "./type";
import { View } from "react-native";
import { LOG, LOG_COLORS } from "src/utility/logger";

//defaults for empty app
export const SnapShotContext = React.createContext<
  SnapShotContextDigestedType | undefined
>(undefined);

const SnapShotContextProvider: FC<SnapShotContextDigestType> = (props) => {
  const [takeSnapShot, _setTakeSnapShot] = useState<TakeSnapshotType>();

  const [image, setImage] = useState<SnapShotImageType>();

  const snapShotRef = useRef<React.RefObject<View>>();

  useEffect(() => {
    const snapShot = async () => {
      if (snapShotRef.current && takeSnapShot) {
        const image = await makeImageFromView(snapShotRef.current);
        if (image) {
          setImage({
            uri: image,
            filename: takeSnapShot.filename,
            type: takeSnapShot.type,
          });
          _setTakeSnapShot(undefined);
        } else {
          console.log("Error Taking Snapshot");
        }
      }
    };
    if (takeSnapShot) {
      snapShot().catch(console.error);
    }
  }, [snapShotRef, takeSnapShot]);

  useEffect(() => {
    const processImage = async () => {
      if (image != null) {
        switch (image.type) {
          case SNAPSHOT_TYPES.SILENT:
            writeImageToFile(image.uri, image.filename);
            break;
          case SNAPSHOT_TYPES.WITH_INDICATOR:
            writeImageToFile(image.uri, image.filename);
            setImage({
              ...image,
              indicatorStatus: false,
              type: SNAPSHOT_TYPES.INDICATOR_RUNNING,
            });
            break;
        }
      }
    };
    if (image) {
      processImage().catch(console.error);
    }
  }, [image]);

  const setTakeSnapShot = useCallback(
    (args: TakeSnapshotType) => {
      _setTakeSnapShot(args);
    },
    [_setTakeSnapShot]
  );

  return (
    <SnapShotContext.Provider
      value={{
        takeSnapShot: takeSnapShot,
        setTakeSnapShot: setTakeSnapShot,
        image: image,
      }}
    >
      {props.children}
    </SnapShotContext.Provider>
  );
};

export default SnapShotContextProvider;
export const SnapShotContextConsumer = SnapShotContext.Consumer;

export const useSnapshotContext = () => {
  const context = useContext(SnapShotContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, "Event Context called outside of provider");
  } else {
    return context;
  }
};

const IMAGE_DIR = FileSystem.documentDirectory + "images/";

const writeImageToFile = async (image: SkImage, fileName: string) => {
  await ensureImageDirExists();
  await FileSystem.writeAsStringAsync(
    snapshotPath(fileName),
    image.encodeToBase64(),
    {
      encoding: FileSystem.EncodingType.Base64,
    }
  );
};

const ensureImageDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIR);
  if (!dirInfo.exists) {
    console.log("Image directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
  }
};

export const snapshotPath = (filename: string) => {
  return `${IMAGE_DIR}/${filename}.png`;
};
