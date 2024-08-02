import AsyncStorage from "@react-native-async-storage/async-storage";

export const writeAsyncStorage = async <T>(keyName: string, value: T) => {
  try {
    AsyncStorage.setItem(keyName, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};
