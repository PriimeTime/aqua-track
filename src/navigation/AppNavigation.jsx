import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import { RootScreen } from "../screens/RootScreen";
import { History } from "../screens/history/History";
import { QuantityInputScreen } from "../screens/inputdrink/QuantityInputScreen";
import { TypeInputScreen } from "../screens/inputdrink/TypeInputScreen";
import { SettingsList } from "../screens/settings/SettingsList";
import { CustomTabBar } from "./CustomTabBar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props}></CustomTabBar>}>
      <Tab.Screen
        name="Home"
        component={RootScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddDrink"
        component={View} // Dummy component, since we're handling navigation manually
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuantityInputScreen"
          component={QuantityInputScreen}
        />
        <Stack.Screen name="TypeInputScreen" component={TypeInputScreen} />
        <Stack.Screen name="Settings" component={SettingsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { AppNavigation };
