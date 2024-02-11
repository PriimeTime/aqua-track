import { View, Text, StyleSheet } from "react-native";
import { color } from "../utils/themes.js";

export default function CustomTabBar({ title, focused, direction }) {
  const dynamicStyles = {
    backgroundColor: focused ? color.LIGHTBLUE : color.WHITE,
    left: direction === "left" ? "5%" : undefined,
    right: direction === "right" ? "5%" : undefined,
    color: focused ? color.WHITE : color.LIGHTBLUE,
  };

  return (
    <View style={[styles.container, dynamicStyles]}>
      <Text style={[styles.text, { color: dynamicStyles.color }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    top: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Chewy-Regular",
    fontSize: 20,
    textTransform: "uppercase",
  },
});
