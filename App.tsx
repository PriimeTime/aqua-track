import store from "./src/store/index";
import { Provider } from "react-redux";
import { MainAppScreen } from "./src/screens/MainAppScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GradientWrapper } from "@/components/wrappers";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";

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
          <I18nextProvider i18n={i18n}>
            <MainAppScreen></MainAppScreen>
          </I18nextProvider>
        </Provider>
      </SafeAreaProvider>
    </GradientWrapper>
  );
}
