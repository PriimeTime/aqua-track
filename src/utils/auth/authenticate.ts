import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserAuth } from "@/models/UserAuth";

const AUTH_DATA_KEY = "authData";

const saveAuthData = async (authData: UserAuth) => {
  if (!authData.uid) {
    console.error("Failed to save authData: userUID null");
    return;
  }

  const data = {
    uid: authData.uid,
    email: authData.email || "",
    userName: authData.userName || "",
    isLoggedIn: authData.isLoggedIn,
  };

  try {
    await AsyncStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save authData:", error);
  }
};

const loadAuthData = async (): Promise<UserAuth | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Failed to load authData:", error);
    return null;
  }
};

const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_DATA_KEY);
  } catch (error) {
    console.error("Failed to clear authData:", error);
  }
};

export { saveAuthData, loadAuthData, clearAuthData };
