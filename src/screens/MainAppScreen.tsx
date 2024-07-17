import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

import { AppNavigation } from "@/navigation/AppNavigation";

import { setHistory } from "@/store/drinkHistory";
import { setUserAuth, setUserMetrics } from "@/store/userData";
import { setNetworkStatus } from "@/store/general";

import { useDatabaseSync, useAuth } from "@/hooks";

import { readAsyncStorage } from "@/utils/storage";
import { syncSavedChangesToDatabase } from "@/utils/database";

import { type UserDataState } from "@/types/store/UserDataState";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";
import { UserMetrics } from "@/models/UserMetrics";
import { UserAuth } from "@/models/UserAuth";
import { cleanupOldEntries } from "@/middleware/asyncStorageMiddleware";

function MainAppScreen() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [isInternetReachable, setIsInternetReachable] = useState(false);

  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );

  const userUID = useSelector(
    (state: UserDataState) => state.userData.userAuth.uid
  );

  /**
   * Listen to internet connectivity changes
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      ({ isConnected, isInternetReachable }) => {
        if (isConnected && isInternetReachable) {
          setIsInternetReachable(true);
        } else {
          setIsInternetReachable(false);
        }

        const networkInfo = {
          isConnected: !!isConnected,
          isReachable: !!isInternetReachable,
        };

        dispatch(setNetworkStatus(networkInfo));
      }
    );

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userUID && isInternetReachable) {
      syncSavedChangesToDatabase(userUID);
    }
  }, [isInternetReachable, userUID]);

  useAuth();

  /**
   * Sync userMetrics to database
   * when internet becomes reachable and
   * when drinkHistory changes
   */
  useDatabaseSync([userMetrics], { userMetrics }, isInternetReachable);

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

  useEffect(() => {
    fetchDataFromAsyncStorage();
    cleanupOldEntries();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <AppNavigation></AppNavigation>
    </View>
  );
}

export { MainAppScreen };
