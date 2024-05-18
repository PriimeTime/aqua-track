import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import WaterDropButton from "./WaterDropButton";
import { color, shadow, SCREEN_SIZE } from "../utils/constants";

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

function CustomTabBar({ state, navigation }) {
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
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === "AddDrink") {
              setTimeout(() => {
                navigation.navigate("TypeInputScreen"); // Update the navigation target for AddDrink
              }, 100);
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        // Render the WaterDropButton for the AddDrink tab
        if (route.name === "AddDrink") {
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
    justifyContent: "center",
    alignItems: "center",
    padding: navbarPadding[SCREEN_SIZE],
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
    fontFamily: "Chewy-Regular",
    fontSize: fontSizes[SCREEN_SIZE],
    textTransform: "uppercase",
  },
});
