import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "youre-not-the-one-demo",
  name: "youre-not-the-one-demo",
  splash: { image: "assets/splash.jpeg", backgroundColor: "black" },
  icon: "assets/yourenottheonedemo.jpg",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.fotoverite.yourenottheonedemo",
    buildNumber: "1.0.0",
  },
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    eas: {
      projectId: "ed7cad9e-d44c-4b58-b977-8f40696fb94a",
    },
  },
});
