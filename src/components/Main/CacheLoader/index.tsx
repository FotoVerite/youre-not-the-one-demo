import AppEventsContextProvider from "@Components/appEvents/context";
import NotificationsContextProvider from "@Components/notifications/context";
import SnapShotContextProvider from "@Components/snapShot/context";
import { FC, PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StorageContextProvider from "src/contexts/asyncStorage";
import FontsContextProvider from "src/contexts/fonts";
import ImageCacheContextProvider from "src/contexts/imageCache";

import useCacheResolver from "./hooks/useCacheResolver";
import { CACHED_KEYS } from "./types";
import { SplashScreen } from "../SplashScreen";

const CacheLoader: FC<PropsWithChildren> = ({ children }) => {
  const [cachedData, resolvedRecord, resolver] = useCacheResolver();
  if (!cachedData) {
    return null;
  }

  return (
    <SplashScreen resolved={!Object.values(resolvedRecord).includes(false)}>
      <FontsContextProvider resolver={resolver}>
        <ImageCacheContextProvider
          data={cachedData[CACHED_KEYS.IMAGES]}
          resolver={resolver}
        >
          <SafeAreaProvider>
            <SnapShotContextProvider>
              <NotificationsContextProvider
                data={cachedData[CACHED_KEYS.NOTIFICATIONS]}
                resolver={resolver}
              >
                <AppEventsContextProvider
                  data={cachedData[CACHED_KEYS.EVENTS]}
                  resolver={resolver}
                >
                  {children}
                </AppEventsContextProvider>
              </NotificationsContextProvider>
            </SnapShotContextProvider>
          </SafeAreaProvider>
        </ImageCacheContextProvider>
      </FontsContextProvider>
    </SplashScreen>
  );
};

export default CacheLoader;
