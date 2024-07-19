import AsyncStorage from "@react-native-async-storage/async-storage";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { readAsyncStorage } from "@/utils/storage/readAsyncStorage";
import { ONE_MONTH } from "@/utils/constants";

/**
 * @returns drink history of user saved locally in
 * AsyncStorage
 */
const getDrinkHistory = async () => {
  try {
    const drinkHistory: DrinkHistoryItem[] | null = await readAsyncStorage(
      "drinkHistory"
    );

    if (!drinkHistory) {
      return [];
    }

    return drinkHistory;
  } catch (error) {
    console.error("Error in getDrinkHistory:", error);
    return new Array<DrinkHistoryItem>();
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

export { getDrinkHistory, cleanupOldEntries };
