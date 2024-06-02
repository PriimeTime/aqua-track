import AsyncStorage from "@react-native-async-storage/async-storage";

export const readAsyncStorage = async <T>(keyName: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(keyName);
    const dataFromStorage: T = jsonValue != null ? JSON.parse(jsonValue) : null;
    return dataFromStorage;
  } catch (e) {
    console.error(e);
    return null;
  }
};
