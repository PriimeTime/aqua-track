import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import { RootScreen, History, DrinkAmount, DrinkSelection } from "@/screens";
import {
  AccountSettings,
  ProfileSettings,
  NotificationsSettings,
  StatisticsSettings,
  ThemeSettings,
  LanguageSettings,
  AboutSettings,
} from "@/screens/settings";
import { AskUserName } from "@/screens/startup";

import { SettingsList } from "@/components/settings/SettingsList";

import { CustomTabBar } from "@/navigation/CustomTabBar";

import { SettingsRouteName } from "@/enums/routes/SettingsRouteName";
import { MainRouteName } from "@/enums/routes/MainRouteName";
import { DrinkRouteName } from "@/enums/routes/DrinkRouteName";
import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { AskGender } from "@/screens/startup/AskGender";
import { AskWeight } from "@/screens/startup/AskWeight";
import { AskExercise } from "@/screens/startup/AskExercise";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props}></CustomTabBar>}>
      <Tab.Screen
        name={MainRouteName.Home}
        component={RootScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={DrinkRouteName.DrinkInput}
        component={View} // Dummy component, since navigation is handled manually
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={MainRouteName.History}
        component={History}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function StartupNavigation({
  onCompleteStartup,
}: {
  onCompleteStartup: () => void;
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={StartupRouteName.UserName}
        component={AskUserName}
      ></Stack.Screen>
      <Stack.Screen
        name={StartupRouteName.Gender}
        component={AskGender}
      ></Stack.Screen>
      <Stack.Screen
        name={StartupRouteName.Weight}
        component={AskWeight}
      ></Stack.Screen>
      <Stack.Screen name={StartupRouteName.Exercise}>
        {(props) => (
          <AskExercise {...props} onCompleteStartup={onCompleteStartup} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={MainRouteName.HomeTabs}
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={DrinkRouteName.DrinkAmount} component={DrinkAmount} />
      <Stack.Screen
        name={DrinkRouteName.DrinkSelection}
        component={DrinkSelection}
      />
      <Stack.Screen name={MainRouteName.Settings} component={SettingsList} />
      <Stack.Screen
        name={SettingsRouteName.AccountSettings}
        component={AccountSettings}
      ></Stack.Screen>
      <Stack.Screen
        name={SettingsRouteName.ProfileSettings}
        component={ProfileSettings}
      ></Stack.Screen>
      <Stack.Screen
        name={SettingsRouteName.NotificationsSettings}
        component={NotificationsSettings}
      ></Stack.Screen>
      <Stack.Screen
        name={SettingsRouteName.StatisticsSettings}
        component={StatisticsSettings}
      ></Stack.Screen>
      <Stack.Screen
        name={SettingsRouteName.ThemeSettings}
        component={ThemeSettings}
      ></Stack.Screen>
      <Stack.Screen
        name={SettingsRouteName.LanguageSettings}
        component={LanguageSettings}
      ></Stack.Screen>
      <Stack.Screen
        name={SettingsRouteName.AboutSettings}
        component={AboutSettings}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export { MainNavigation, StartupNavigation };
