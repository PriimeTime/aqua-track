import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  DimensionValue,
} from "react-native";
import { WaterDropButton } from "@/components/navigation/WaterDropButton";
import { color, shadow, SCREEN_SIZE, fontFamily } from "@/utils/constants";
import { DrinkRouteName } from "@/enums/routes/DrinkRouteName";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers } from "@react-navigation/native";

const fontSizes = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 28,
};

const navbarBorderRadius = {
  SMALL: 26,
  MEDIUM: 36,
  LARGE: 72,
};

const navbarPadding = {
  SMALL: "2%",
  MEDIUM: "2.5%",
  LARGE: "1.5%",
};

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
    padding: navbarPadding[SCREEN_SIZE] as DimensionValue,
  },
  navigationBar: {
    position: "absolute",
    bottom: "2.5%",
    left: "5%",
    backgroundColor: color.WHITE,
    ...shadow,
    borderRadius: navbarBorderRadius[SCREEN_SIZE],
    height: "7.5%",
    width: "90%",
  },
  container: {
    width: "100%",
    height: "100%",
    borderRadius: navbarBorderRadius[SCREEN_SIZE],
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: fontSizes[SCREEN_SIZE],
    textTransform: "uppercase",
  },
});
