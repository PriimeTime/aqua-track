import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RootScreen } from "../screens/RootScreen";
import { History } from "../screens/history/History";
import { QuantityInputScreen } from "../screens/inputdrink/QuantityInputScreen";
import { TypeInputScreen } from "../screens/inputdrink/TypeInputScreen";
import { SettingsList } from "../screens/settings/SettingsList";

import { color } from "../utils/themes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: color.APP_SECONDARY_BACKGROUND,
          height: 90,
        },
        tabBarActiveTintColor: "lightblue",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Home"
        component={RootScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
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
