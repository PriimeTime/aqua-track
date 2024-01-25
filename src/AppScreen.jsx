import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigation } from "./components/navigation/AppNavigation";

function AppScreen() {
  return (
    <SafeAreaProvider>
      <AppNavigation></AppNavigation>
    </SafeAreaProvider>
  );
}

export default AppScreen;
