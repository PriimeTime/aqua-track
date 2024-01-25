import { Pressable, Text } from "react-native";
import { color } from "../../../utils/themes";

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
    textAlign: "center",
    lineHeight: 30,
    fontSize,
    fontWeight: 400,
    letterSpacing: 1.2,
    color: "white",
  };

  return baseStyle;
}

function getButtonStyle(size, pressed) {
  const paddingValues = {
    1: { vertical: 10, horizontal: 20 },
    2: { vertical: 20, horizontal: 40 },
    3: { vertical: 30, horizontal: 60 },
  };

  const { vertical, horizontal } = paddingValues[size] || paddingValues[2]; // Default to size 2 if not defined

  const baseStyle = {
    paddingVertical: vertical,
    paddingHorizontal: horizontal,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: pressed
      ? color.PRIMARY_BUTTON_PRESSED
      : color.PRIMARY_BUTTON,
  };

  return baseStyle;
}

function PrimaryButton({ onPress, fontSize, children, buttonSize }) {
  return (
    <Pressable
      style={({ pressed }) => getButtonStyle(buttonSize, pressed)}
      onPress={onPress}
    >
      <Text style={getTextStyle(fontSize)}>{children}</Text>
    </Pressable>
  );
}

export { PrimaryButton };
