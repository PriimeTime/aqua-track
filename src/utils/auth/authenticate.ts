import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserAuth } from "@/models/UserAuth";

const saveAuthData = async (authData: UserAuth) => {
  if (!authData.uid) {
    console.error("Failed to save authData: userUID null");
  } else {
    await AsyncStorage.setItem("userUID", authData.uid);
    await AsyncStorage.setItem("email", authData.email || "");
    await AsyncStorage.setItem("userName", authData.userName || "");
    await AsyncStorage.setItem("isLoggedIn", String(authData.isLoggedIn));
  }
};

const clearAuthData = async () => {
  await AsyncStorage.removeItem("userUID");
  await AsyncStorage.removeItem("email");
  await AsyncStorage.removeItem("userName");
  await AsyncStorage.removeItem("isLoggedIn");
};

export { saveAuthData, clearAuthData };
