import { SkImage } from "@shopify/react-native-skia";
import { PropsWithChildren, ReactNode } from "react";

export enum SNAPSHOT_TYPES {
  SILENT,
  BACKGROUND_IMAGE,
  WITH_INDICATOR,
  INDICATOR_RUNNING,
  INDICATOR_FINISHED,
}

export type TakeSnapshotType = {
  filename: string;
  type: Exclude<
    SNAPSHOT_TYPES,
    SNAPSHOT_TYPES.INDICATOR_RUNNING | SNAPSHOT_TYPES.INDICATOR_FINISHED
  >;
};

export type SnapShotImageType =
  | undefined
  | null
  | {
      uri: SkImage;
      filename: string;
      type: SNAPSHOT_TYPES;
      indicatorStatus?: boolean;
    };

export type SnapShotContextDigestType = {
  children: ReactNode;
};

export type SnapShotContextDigestedType = PropsWithChildren<{
  takeSnapShot?: TakeSnapshotType;
  setTakeSnapShot: (args: TakeSnapshotType) => void;
  image: SnapShotImageType;
}>;
