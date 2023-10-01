import AppEventsContextProvider from "@Components/appEvents/context";
import NotificationsContextProvider from "@Components/notifications/context";
import Messages from "@Components/phoneApplications/Messages/components/Messages";
import SnapShotContextProvider from "@Components/snapShot/context";
import Constants from "expo-constants";
import { FC } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontsContextProvider from "src/contexts/fonts";
import StorageContextProvider from "src/contexts/storage";
import { LOG, LOG_COLORS } from "src/utility/logger";

import { AppLoader } from "./AppLoader";
import useSplashAnimation from "./hooks/useSplashAnimation";

const Main: FC = () => {
  const [resolver, animationFinished, opacity] = useSplashAnimation();
  const uri = Constants.expoConfig?.splash?.image;

  if (uri == null) {
    LOG(LOG_COLORS.FgRed, "SPLASH SCREEN NOT SET UP");
    return <></>;
  }
  return (
    <AppLoader
      image={{ uri }}
      animationFinished={animationFinished}
      opacity={opacity}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StorageContextProvider resolver={resolver}>
          <FontsContextProvider resolver={resolver}>
            <SafeAreaProvider>
              <SnapShotContextProvider>
                <NotificationsContextProvider>
                  <AppEventsContextProvider>
                    <Messages />
                  </AppEventsContextProvider>
                </NotificationsContextProvider>
              </SnapShotContextProvider>
            </SafeAreaProvider>
          </FontsContextProvider>
        </StorageContextProvider>
      </GestureHandlerRootView>
    </AppLoader>
  );
};

export default Main;
