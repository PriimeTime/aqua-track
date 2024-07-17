import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { readAsyncStorage } from "@/utils/storage/readAsyncStorage";

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

export { getDrinkHistory };
