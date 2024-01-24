import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./src/components/HomeScreen";
import { QuantityInputScreen } from "./src/components/screens/inputdrink/QuantityInputScreen";
import { TypeInputScreen } from "./src/components/screens/inputdrink/TypeInputScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [amountDrank, setAmountDrank] = useState(0);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="home">
            {(props) => (
              <HomeScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="quantityInputScreen">
            {(props) => (
              <QuantityInputScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="typeInputScreen">
            {(props) => (
              <TypeInputScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
