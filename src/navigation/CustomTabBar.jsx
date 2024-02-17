import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import WaterDropButton from "./WaterDropButton";
import { color, shadow } from "../utils/themes";

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
              navigation.navigate("TypeInputScreen"); // Update the navigation target for AddDrink
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
    padding: "2.5%",
  },
  navigationBar: {
    position: "absolute",
    bottom: "2.5%",
    left: "5%",
    backgroundColor: color.WHITE,
    ...shadow,
    borderRadius: 36,
    height: "7.5%",
    width: "90%",
  },
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Chewy-Regular",
    fontSize: 20,
    textTransform: "uppercase",
  },
});
