import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDrinkHistory, readAsyncStorage } from "@/utils/storage";
import { ONE_MONTH } from "@/utils/constants";

const addDrink = async (newDrink) => {
  try {
    const history = await getDrinkHistory();
    history.push(newDrink);
    await AsyncStorage.setItem("drinkHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Error in addDrink:", error);
  }
};

/**
 * Remove entries older than
 * one month from the AsyncStorage
 */
const cleanupOldEntries = async () => {
  const history = await getDrinkHistory();
  const oneMonthAgo = Date.now() - ONE_MONTH;
  const filteredHistory = history.filter(
    (drink) => new Date(drink.date).getTime() >= oneMonthAgo
  );
  await AsyncStorage.setItem("drinkHistory", JSON.stringify(filteredHistory));
};

const removeDrink = async (drinkId) => {
  let history = await getDrinkHistory();
  history = history.filter((drink) => drink.id !== drinkId);

  if (!history) {
    history = [];
  }

  await AsyncStorage.setItem("drinkHistory", JSON.stringify(history));
};

const asyncStorageMiddleware = (store) => (next) => async (action) => {
  const result = next(action); // Call the next dispatch method in the middleware chain.
  const newState = store.getState(); // Get the new state after the action is processed.

  const actionType = action.type;
  const actionPayload = action.payload;

  const userAuthAction = actionType.startsWith("userData/setUserAuth");
  const userMetricsAction = actionType.startsWith("userData/setUserMetrics");
  const drinkHistoryAction = actionType.startsWith("drinkHistory");

  // Update AsyncStorage based on specific actions or state changes.
  if (drinkHistoryAction) {
    const action = actionType.split("drinkHistory/")[1];

    switch (action) {
      case "addToHistory":
        addDrink(actionPayload);
        break;
      case "removeFromHistory":
        removeDrink(actionPayload);
        break;
    }
  }

  if (userMetricsAction) {
    await AsyncStorage.setItem(
      "userMetrics",
      JSON.stringify(newState.userData.userMetrics)
    );
  }

  if (userAuthAction) {
    await AsyncStorage.setItem(
      "userAuth",
      JSON.stringify(newState.userData.userAuth)
    );
  }

  return result;
};

export { asyncStorageMiddleware, cleanupOldEntries };
