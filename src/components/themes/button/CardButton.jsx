import { Pressable, Text, View, StyleSheet } from "react-native";
import { color } from "../../../utils/themes";
import Ionicons from "@expo/vector-icons/Ionicons";

function getTextStyle(size) {
  const fontSizeValues = {
    1: { fontSize: 15 },
    2: { fontSize: 20 },
    3: { fontSize: 25 },
    4: { fontSize: 30 },
    5: { fontSize: 35 },
  };

  const fontSize = fontSizeValues[size] || 25;

  const baseStyle = {
    fontSize,
    fontWeight: 500,
    letterSpacing: 1.2,
    paddingTop: 10,
    color: color.SECONDARY_BUTTON,
  };

  return baseStyle;
}

function getButtonStyle(selected) {
  const baseStyle = {
    width: "80%",
    left: "10%",
    top: "10%",
    height: "80%",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: selected ? color.PRIMARY_BUTTON_PRESSED : color.PRIMARY_BUTTON,
  };

  return baseStyle;
}

function CardButton({ onPress, buttonIcon, fontSize, children, selected }) {
  return (
    <View style={styles.wrapper}>
      <Pressable style={getButtonStyle(selected)} onPress={onPress}>
        <View style={styles.container}>
          <Ionicons
            color={color.SECONDARY_BUTTON}
            size={25}
            name={buttonIcon}
          ></Ionicons>
          <Text style={getTextStyle(fontSize)}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export { CardButton };

const styles = StyleSheet.create({
  wrapper: { height: "25%", width: "50%" },
  container: {
    position: "absolute",
    top: "15%",
    left: "7.5%",
  },
});
