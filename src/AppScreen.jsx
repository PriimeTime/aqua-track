import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "./navigation/AppNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHistory } from "./store/store";

const readAsyncStorage = async (keyName) => {
  try {
    const jsonValue = await AsyncStorage.getItem(keyName);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

function AppScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await readAsyncStorage("currentHistory");

      /**
       * If storage not empty,
       * fill redux with storage data
       */
      if (storedData?.length > 0) {
        dispatch(setHistory(storedData));
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
