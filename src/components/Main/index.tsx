import Messages from "@Components/phoneApplications/Messages/components/Messages";
import Constants from "expo-constants";
import { FC } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LOG, LOG_COLORS } from "src/utility/logger";

import CacheLoader from "./CacheLoader";

const Main: FC = () => {
  const uri = Constants.expoConfig?.splash?.image;

  if (uri == null) {
    LOG(LOG_COLORS.FgRed, "SPLASH SCREEN NOT SET UP");
    return <></>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CacheLoader>
        <Messages />
      </CacheLoader>
    </GestureHandlerRootView>
  );
};

export default Main;
