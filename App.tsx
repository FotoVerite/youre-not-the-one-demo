import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import SnapShotContextProvider from "@Components/snapShot/context";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }, []);

  return (
    <SafeAreaProvider>
      <SnapShotContextProvider>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </SnapShotContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
