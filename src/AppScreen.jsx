import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "./navigation/AppNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHistory } from "./store/drinkHistory";
import { readAsyncStorage } from "./utils/middleware";
import { setUserMetrics } from "./store/userData";

function AppScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const currentHistory = await readAsyncStorage("currentHistory");
      const userMetrics = await readAsyncStorage("userMetrics");

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
