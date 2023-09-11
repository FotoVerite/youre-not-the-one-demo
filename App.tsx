import AppEventsContextProvider from "@Components/appEvents/context";
import NotificationsContextProvider from "@Components/notifications/context";
import Messages from "@Components/phoneApplications/Messages/components/Messages";
import SnapShotContextProvider from "@Components/snapShot/context";
import Constants from "expo-constants";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontsContextProvider from "src/contexts/fonts";

const App = () => {
  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FontsContextProvider>
        <SafeAreaProvider>
          <AppEventsContextProvider>
            <SnapShotContextProvider>
              <NotificationsContextProvider>
                <Messages />
              </NotificationsContextProvider>
            </SnapShotContextProvider>
          </AppEventsContextProvider>
        </SafeAreaProvider>
      </FontsContextProvider>
    </GestureHandlerRootView>
  );
};

let AppEntryPoint = App;

// Render Storybook if storybookEnabled is true
if (Constants?.expoConfig?.extra?.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

export default AppEntryPoint;
