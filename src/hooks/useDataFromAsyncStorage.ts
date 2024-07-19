import { useDispatch } from "react-redux";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";
import { UserMetrics } from "@/models/UserMetrics";
import { UserAuth } from "@/models/UserAuth";

import { readAsyncStorage } from "@/utils/storage";

import { setHistory } from "@/store/drinkHistory";
import { setUserAuth, setUserMetrics } from "@/store/userData";

/**
 * Custom hook to fetch and dispatch data from async storage.
 * The returned object is a function which populates the redux store
 * with the data fetched from AsyncStorage.
 *
 * @returns an object containing the `fetchDataFromAsyncStorage` function
 */
function useDataFromAsyncStorage() {
  const dispatch = useDispatch();

  const fetchDataFromAsyncStorage = async () => {
    try {
      const drinkHistory: DrinkHistoryItem[] | null = await readAsyncStorage(
        "drinkHistory"
      );
      const userMetrics: UserMetrics | null = await readAsyncStorage(
        "userMetrics"
      );
      const userAuth: UserAuth | null = await readAsyncStorage("userAuth");

      if (drinkHistory && drinkHistory.length > 0) {
        dispatch(setHistory(drinkHistory));
      } else {
        console.info(
          "Failed to update drink history, drinkHistory was either undefined or its length was 0"
        );
      }

      if (userMetrics) {
        dispatch(setUserMetrics(userMetrics));
      }

      if (userAuth) {
        dispatch(setUserAuth(userAuth));
      }
    } catch (error) {
      console.error("Failed to fetch data from storage:", error);
    }
  };

  return { fetchDataFromAsyncStorage };
}

export { useDataFromAsyncStorage };
