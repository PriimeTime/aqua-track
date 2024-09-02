import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserAuth } from "@/models/UserAuth";

import { writeAsyncStorage } from "@/utils/storage";

const AUTH_DATA_KEY = "authData";

/**
 * Saves user authentication data to local storage.
 *
 * This function takes user authentication data and saves it to async storage.
 * If the user ID (uid) is missing, it logs an error and exits without saving.
 *
 * The data object includes the user ID, email, username, and login status.
 * The function attempts to save this data as a JSON string under a predefined
 * key in async storage, and logs an error if the save operation fails.
 *
 * @param {*} authData - user authentication object
 */
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
    await writeAsyncStorage(AUTH_DATA_KEY, data);
  } catch (error) {
    console.error("Failed to save authData:", error);
  }
};

/**
 * Loads user authentication data from local storage.
 *
 * This function attempts to retrieve the user authentication data from async storage.
 * It parses the JSON string into a UserAuth object if data is found, otherwise it returns null.
 * If an error occurs during retrieval or parsing, it logs the error and returns null.
 *
 * @returns {Promise<UserAuth | null>} - promise that resolves to the user authentication data if it exists, otherwise null
 */
const loadAuthData = async (): Promise<UserAuth | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Failed to load authData:", error);
    return null;
  }
};

/**
 * Clears user authentication data from local storage.
 *
 * This function removes the user authentication data from async storage.
 * If an error occurs during the removal process, it logs the error.
 *
 * @returns {Promise<void>} - promise that resolves when the operation is complete
 */
const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_DATA_KEY);
  } catch (error) {
    console.error("Failed to clear authData:", error);
  }
};

export { saveAuthData, loadAuthData, clearAuthData };
