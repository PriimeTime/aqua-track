import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainHeader } from "./src/components/MainHeader";
import { InputScreen } from "./src/components/InputScreen";
import { Statistics } from "./src/components/Statistics";
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

function HomeScreen({ navigation, route, amountDrank, setAmountDrank }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MainHeader amountDrank={amountDrank}></MainHeader>
      <InputScreen navigation={navigation} setAmountDrank={setAmountDrank} />
      <Statistics />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
});
