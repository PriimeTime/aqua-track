import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "./navigation/AppNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHistory } from "./store/drinkHistory";
import { readAsyncStorage } from "./utils/middleware";
import { setUserLoginState, setUserMetrics } from "./store/userData";

function AppScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const currentHistory = await readAsyncStorage("currentHistory");
      const userMetrics = await readAsyncStorage("userMetrics");
      const userAuth = await readAsyncStorage("userAuth");

      /**
       * If storage not empty,
       * fill redux with storage data
       */
      if (currentHistory?.length > 0) {
        dispatch(setHistory(currentHistory));
      }

      if (userMetrics) {
        dispatch(setUserMetrics(userMetrics));
      }

      if (userAuth) {
        dispatch(setUserLoginState(userAuth));
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigation></AppNavigation>
    </SafeAreaProvider>
  );
}

export default AppScreen;
