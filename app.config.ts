import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "youre-not-the-one-demo",
  name: "youre-not-the-one-demo",
  extra: { storybookEnabled: process.env.STORYBOOK_ENABLED },
});
