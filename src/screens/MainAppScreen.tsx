import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "../navigation/AppNavigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../store/drinkHistory";
import { readAsyncStorage } from "../utils/storage";
import { setUserAuth, setUserMetrics } from "../store/userData";
import { setNetworkStatus } from "../store/general";
import { useDatabaseSync } from "../hooks/useDatabaseSync";

import NetInfo from "@react-native-community/netinfo";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";
import { type UserDataState } from "@/types/UserDataState";
import { type GeneralState } from "@/types/GeneralState";
import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";
import { UserMetrics } from "@/models/UserMetrics";
import { UserAuth } from "@/models/UserAuth";

// const handleAppStateChange = async (nextAppState) => {
//   if (nextAppState === "active") {
//     console.log("App has come to the foreground!");
//     // update firestore with new data!
//   }
// };

function MainAppScreen() {
  const dispatch = useDispatch();

  const isInternetReachable = useSelector(
    (state: GeneralState) => state.general.networkStatus.isReachable
  );
  const userDrinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );
  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const isLoggedIn = useSelector(
    (state: UserDataState) => state.userData.userAuth.isLoggedIn
  );
  const userUID = useSelector(
    (state: UserDataState) => state.userData.userAuth.uid
  );

  /**
   * Listen to internet connectivity changes
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const networkInfo = {
        isConnected: !!state.isConnected,
        isReachable: !!state.isInternetReachable,
      };

      dispatch(setNetworkStatus(networkInfo));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Sync drinkHistory to database
   * when internet becomes reachable and
   * when drinkHistory changes
   */
  useDatabaseSync(
    [userDrinkHistory],
    { userDrinkHistory },
    isLoggedIn,
    isInternetReachable,
    userUID
  );

  /**
   * Sync userMetrics to database
   * when internet becomes reachable and
   * when drinkHistory changes
   */
  useDatabaseSync(
    [userMetrics],
    { userMetrics },
    isLoggedIn,
    isInternetReachable,
    userUID
  );

  const fetchDataFromAsyncStorage = async () => {
    try {
      const currentHistory: DrinkHistoryItem[] | null = await readAsyncStorage(
        "currentHistory"
      );
      const userMetrics: UserMetrics | null = await readAsyncStorage(
        "userMetrics"
      );
      const userAuth: UserAuth | null = await readAsyncStorage("userAuth");

      if (currentHistory && currentHistory.length > 0) {
        dispatch(setHistory(currentHistory));
      } else {
        console.warn(
          "Failed to update drink history, currentHistory was either undefined or its length was 0"
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

  useEffect(() => {
    fetchDataFromAsyncStorage();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigation></AppNavigation>
    </SafeAreaProvider>
  );
}

export default MainAppScreen;
