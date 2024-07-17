import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

import { AppNavigation } from "@/navigation/AppNavigation";

import { setNetworkStatus } from "@/store/general";

import { useDatabaseSync, useAuth, useDataFromAsyncStorage } from "@/hooks";

import { syncSavedChangesToDatabase } from "@/utils/database";

import { type UserDataState } from "@/types/store/UserDataState";

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

  const { fetchDataFromAsyncStorage } = useDataFromAsyncStorage();

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

  /**
   * Sync user drink history to the database
   */
  useEffect(() => {
    if (userUID && isInternetReachable) {
      syncSavedChangesToDatabase(userUID);
    }
  }, [isInternetReachable, userUID]);

  /** Handle authentication automatically */
  useAuth();

  /**
   * Sync userMetrics to database
   * when internet becomes reachable and
   * when drinkHistory changes
   */
  useDatabaseSync([userMetrics], { userMetrics }, isInternetReachable);

  /** Fetch data from async storage into the Redux store
   * and clean up entries older than a month
   */
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
