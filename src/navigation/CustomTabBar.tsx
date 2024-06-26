import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  DimensionValue,
} from "react-native";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers } from "@react-navigation/native";

import { WaterDropButton } from "@/components/navigation";

import { color, shadow, fontFamily } from "@/utils/constants";
import {
  customTabBarPadding,
  customTabBarRadius,
  customTabBarFontSize,
} from "@/utils/constants/components";

import { DrinkRouteName } from "@/enums/routes/DrinkRouteName";

interface CustomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  return (
    <View style={[{ flexDirection: "row" }, styles.navigationBar]}>
      {state.routes.map((route, index) => {
        const label = route.name;

        const isFocused = state.index === index;

        const dynamicBgStyle = {
          backgroundColor: isFocused ? color.LIGHTBLUE : color.WHITE,
        };

        const dynamicTextStyle = {
          color: isFocused ? color.WHITE : color.LIGHTBLUE,
        };

        const onPress = () => {
          if (!isFocused) {
            if (route.name === DrinkRouteName.DrinkInput) {
              setTimeout(() => {
                navigation.navigate(DrinkRouteName.DrinkSelection); // Update the navigation target for AddDrink
              }, 100);
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        // Render the WaterDropButton for the AddDrink tab
        if (route.name === DrinkRouteName.DrinkInput) {
          return (
            <WaterDropButton
              style={{ bottom: "10%" }}
              key={label}
              onPress={onPress}
            />
          );
        } else {
          // Render standard button for other tabs
          return (
            <Pressable key={label} onPress={onPress} style={styles.wrapper}>
              <View style={[styles.container, dynamicBgStyle]}>
                <Text style={[styles.text, dynamicTextStyle]}>{label}</Text>
              </View>
            </Pressable>
          );
        }
      })}
    </View>
  );
}

export { CustomTabBar };

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: customTabBarPadding as DimensionValue,
  },
  navigationBar: {
    position: "absolute",
    bottom: "2.5%",
    left: "5%",
    backgroundColor: color.WHITE,
    ...shadow,
    borderRadius: customTabBarRadius,
    height: "7.5%",
    width: "90%",
  },
  container: {
    width: "100%",
    height: "100%",
    borderRadius: customTabBarRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: customTabBarFontSize,
    textTransform: "uppercase",
  },
});
