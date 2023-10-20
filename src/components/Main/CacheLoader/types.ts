export enum CACHED_KEYS {
  EVENTS = "events",
  FONTS = "fonts",
  IMAGES = "images",
  NOTIFICATIONS = "notifications",
}

export type AppResolverCallbackType = (
  resolved: CACHED_KEYS,
  value: boolean
) => void;

export type AppResolverType = Record<CACHED_KEYS, boolean>;
export type AsyncStorageType = Record<CACHED_KEYS, string | undefined>;
