import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import { RootScreen } from "../screens/RootScreen";
import { History } from "../screens/History";
import { DrinkAmount } from "../screens/drinkInput/DrinkAmount";
import { DrinkSelection } from "../screens/drinkInput/DrinkSelection";
import { SettingsList } from "../components/settings/SettingsList";
import { AccountSettings } from "../screens/settings/AccountSettings";
import { ProfileSettings } from "../screens/settings/ProfileSettings";
import { NotificationsSettings } from "../screens/settings/NotificationsSettings";
import { StatisticsSettings } from "../screens/settings/StatisticsSettings";
import { ThemeSettings } from "../screens/settings/ThemeSettings";
import { LanguageSettings } from "../screens/settings/LanguageSettings";
import { AboutSettings } from "../screens/settings/AboutSettings";
import { CustomTabBar } from "./CustomTabBar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
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
        <Stack.Screen name="DrinkAmount" component={DrinkAmount} />
        <Stack.Screen name="DrinkSelection" component={DrinkSelection} />
        <Stack.Screen name="Settings" component={SettingsList} />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
        ></Stack.Screen>
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
        ></Stack.Screen>
        <Stack.Screen
          name="NotificationsSettings"
          component={NotificationsSettings}
        ></Stack.Screen>
        <Stack.Screen
          name="StatisticsSettings"
          component={StatisticsSettings}
        ></Stack.Screen>
        <Stack.Screen
          name="ThemeSettings"
          component={ThemeSettings}
        ></Stack.Screen>
        <Stack.Screen
          name="LanguageSettings"
          component={LanguageSettings}
        ></Stack.Screen>
        <Stack.Screen
          name="AboutSettings"
          component={AboutSettings}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { AppNavigation };
