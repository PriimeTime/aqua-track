import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";

import WaterDropButton from "./WaterDropButton";
import CustomTabBar from "./CustomTabBar";
import { RootScreen } from "../screens/RootScreen";
import { History } from "../screens/history/History";
import { QuantityInputScreen } from "../screens/inputdrink/QuantityInputScreen";
import { TypeInputScreen } from "../screens/inputdrink/TypeInputScreen";
import { SettingsList } from "../screens/settings/SettingsList";

import { color, shadow } from "../utils/themes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.waterDrop,
      }}
    >
      <Tab.Screen
        name="Home"
        component={RootScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <CustomTabBar
              title="Home"
              focused={focused}
              direction="left"
            ></CustomTabBar>
          ),
        }}
      />
      <Tab.Screen
        name="AddDrink"
        component={View} // Dummy component, since we're handling navigation manually
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: (size) => (
            <WaterDropButton
              onPress={() => navigation.navigate("TypeInputScreen")}
            ></WaterDropButton>
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBar
              title="History"
              focused={focused}
              direction="right"
            ></CustomTabBar>
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

const styles = StyleSheet.create({
  waterDrop: {
    position: "absolute",
    bottom: 50,
    left: "5%",
    elevation: 5,
    backgroundColor: color.WHITE,
    ...shadow,
    borderRadius: 36,
    height: 72,
    width: "90%",
  },
});
