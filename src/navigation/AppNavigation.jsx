import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import WaterDrop from "../../assets/icons/WaterDrop.svg";

import { RootScreen } from "../screens/RootScreen";
import { History } from "../screens/history/History";
import { QuantityInputScreen } from "../screens/inputdrink/QuantityInputScreen";
import { TypeInputScreen } from "../screens/inputdrink/TypeInputScreen";
import { SettingsList } from "../screens/settings/SettingsList";

import { color, shadow } from "../utils/themes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
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
      }}
    >
      <Tab.Screen
        name="Home"
        component={RootScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 100,
                borderRadius: 25,
                backgroundColor: focused ? color.LIGHTBLUE : color.WHITE,
                height: 50,
                top: 22,
                left: "5%",
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: focused ? color.WHITE : color.LIGHTBLUE,
                  fontFamily: "Chewy-Regular",
                  fontSize: 20,
                  textTransform: "uppercase",
                }}
              >
                home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddDrink"
        component={View} // Dummy component, since we're handling navigation manually
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: (size) => <WaterDrop width={110} height={110} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Navigate to the TypeInputScreen using the stack navigator
            navigation.navigate("TypeInputScreen");
          },
        })}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 100,
                borderRadius: 25,
                backgroundColor: focused ? color.LIGHTBLUE : color.WHITE,
                height: 50,
                top: 22,
                right: "5%",
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: focused ? color.WHITE : color.LIGHTBLUE,
                  fontFamily: "Chewy-Regular",
                  fontSize: 20,
                  textTransform: "uppercase",
                }}
              >
                History
              </Text>
            </View>
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
