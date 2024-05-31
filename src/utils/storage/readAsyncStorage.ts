import AsyncStorage from "@react-native-async-storage/async-storage";

export const readAsyncStorage = async (keyName: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(keyName);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};
