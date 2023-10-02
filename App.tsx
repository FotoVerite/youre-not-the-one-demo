import Main from "@Components/Main";
import Constants from "expo-constants";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { Platform } from "react-native";

const App = () => {
  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    }
  }, []);

  return <Main />;
};

let AppEntryPoint = App;

// Render Storybook if storybookEnabled is true
if (Constants?.expoConfig?.extra?.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

export default AppEntryPoint;
