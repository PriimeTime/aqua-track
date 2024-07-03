import store from "./src/store/index";
import { Provider } from "react-redux";
import { MainAppScreen } from "./src/screens/MainAppScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GradientWrapper } from "@/components/wrappers";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Chewy-Regular": require("./assets/fonts/Chewy-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <GradientWrapper style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <Provider store={store}>
          <MainAppScreen></MainAppScreen>
        </Provider>
      </SafeAreaProvider>
    </GradientWrapper>
  );
}
