import AsyncStorage from "@react-native-async-storage/async-storage";

import { LOG, LOG_COLORS } from "./logger";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    LOG(LOG_COLORS.FgRed, `Error saving ${key}: ${e}`);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    LOG(LOG_COLORS.FgRed, `Error removing ${key}: ${e}`);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    LOG(LOG_COLORS.FgRed, `Error getting ${key}: ${e}`);
  }
};
