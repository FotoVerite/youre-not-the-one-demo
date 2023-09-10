import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { SkImage, makeImageFromView } from "@shopify/react-native-skia";
import {
  SNAPSHOT_TYPES,
  SnapShotContextDigestType,
  SnapShotContextDigestedType,
  SnapShotImageType,
  TakeSnapshotType,
} from "./type";
import { LOG, LOG_COLORS } from "src/utility/logger";
import { writeImageToFs } from "src/utility/filesystem";
import SnapshotIndicator from "../SnapShotIndicator";

//defaults for empty app
export const SnapShotContext = React.createContext<
  SnapShotContextDigestedType | undefined
>(undefined);

const SnapShotContextProvider: FC<SnapShotContextDigestType> = (props) => {
  const [takeSnapShot, _setTakeSnapShot] = useState<TakeSnapshotType>();

  const [image, _setImage] = useState<SnapShotImageType>();

  const snapShotRef = useRef<React.RefObject<View>>();

  useEffect(() => {
    const snapShot = async () => {
      if (snapShotRef.current && takeSnapShot) {
        const image = await makeImageFromView(snapShotRef.current);
        if (image) {
          _setImage({
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
            writeImageToFs(image.uri, image.filename);
            break;
          case SNAPSHOT_TYPES.WITH_INDICATOR:
            writeImageToFs(image.uri, image.filename);
            _setImage({
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

  const setImage = useCallback(
    (args: SnapShotImageType) => {
      _setImage(args);
    },
    [_setTakeSnapShot]
  );

  useEffect(() => {
    setTakeSnapShot({
      filename: "Blah",
      type: SNAPSHOT_TYPES.BACKGROUND_IMAGE,
    });
  }, []);

  return (
    <SnapShotContext.Provider
      value={{
        takeSnapShot: takeSnapShot,
        setTakeSnapShot: setTakeSnapShot,
        image: image,
        setImage: _setImage,
      }}
    >
      <>
        <SnapshotIndicator image={image} setImage={setImage} />
        {props.children}
      </>
    </SnapShotContext.Provider>
  );
};

export default SnapShotContextProvider;
export const SnapShotContextConsumer = SnapShotContext.Consumer;

export const useSnapshotContext = () => {
  const ERROR_MESSAGE = "SnapshotContext called outside it's provider";
  const context = useContext(SnapShotContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};
