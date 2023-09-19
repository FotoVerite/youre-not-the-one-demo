import { PropsWithChildren, ReactNode } from "react";

export type MediaContextDigestType = {
  children: ReactNode;
};

export type MediaContextDigestedType = PropsWithChildren<{
  setMedia: (media: React.ReactElement) => void;
}>;
