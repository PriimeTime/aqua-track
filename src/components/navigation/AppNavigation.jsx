import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RootScreen } from "../RootScreen";
import { History } from "../screens/history/History";
import { QuantityInputScreen } from "../screens/inputdrink/QuantityInputScreen";
import { TypeInputScreen } from "../screens/inputdrink/TypeInputScreen";

import { color } from "../../utils/themes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home">
        {(props) => <RootScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="quantityInputScreen">
        {(props) => <QuantityInputScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="typeInputScreen">
        {(props) => <TypeInputScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="history">
        {(props) => <History {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.APP_SECONDARY_BACKGROUND,
            height: 90,
          },
          tabBarActiveTintColor: "lightblue",
          tabBarInactiveTintColor: "black",
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
          name="Home"
          component={RootStack}
        ></Tab.Screen>
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" color={color} size={size} />
            ),
          }}
          name="History"
          component={HistoryStack}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export { AppNavigation };
