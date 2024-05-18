import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "../navigation/AppNavigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../store/drinkHistory";
import { readAsyncStorage } from "../utils/middleware";
import { setUserAuth, setUserMetrics } from "../store/userData";
import { setNetworkStatus } from "../store/general";
import { useDatabaseSync } from "../hooks/useDatabaseSync";

import NetInfo from "@react-native-community/netinfo";

const handleAppStateChange = async (nextAppState) => {
  if (nextAppState === "active") {
    console.log("App has come to the foreground!");
    // update firestore with new data!
  }
};

function MainAppScreen() {
  const dispatch = useDispatch();

  const isInternetReachable = useSelector(
    (state) => state.general.networkStatus.isReachable
  );
  const userDrinkHistory = useSelector((state) => state.drinkHistory);
  const userMetrics = useSelector((state) => state.userData.userMetrics);
  const isLoggedIn = useSelector((state) => state.userData.userAuth.isLoggedIn);
  const userUID = useSelector((state) => state.userData.userAuth.uid);

  /**
   * Listen to internet connectivity changes
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const networkInfo = {
        isConnected: state.isConnected,
        isReachable: state.isInternetReachable,
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
      const currentHistory = await readAsyncStorage("currentHistory");
      const userMetrics = await readAsyncStorage("userMetrics");
      const userAuth = await readAsyncStorage("userAuth");

      if (currentHistory?.length > 0) {
        dispatch(setHistory(currentHistory));
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
