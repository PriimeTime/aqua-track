import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorageMiddleware = (store) => (next) => async (action) => {
  const result = next(action); // Call the next dispatch method in the middleware chain.
  const newState = store.getState(); // Get the new state after the action is processed.

  // Update AsyncStorage based on specific actions or state changes.
  if (action.type.startsWith("drinkHistory")) {
    await AsyncStorage.setItem(
      "currentHistory",
      JSON.stringify(newState.drinkHistory)
    );
  }

  if (action.type.startsWith("userData/setUserMetrics")) {
    await AsyncStorage.setItem(
      "userMetrics",
      JSON.stringify(newState.userData.userMetrics)
    );
  }

  if (action.type.startsWith("userData/setUserAuth")) {
    await AsyncStorage.setItem(
      "userAuth",
      JSON.stringify(newState.userData.userAuth)
    );
  }

  return result;
};

export { asyncStorageMiddleware };
