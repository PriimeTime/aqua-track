import { Pressable, Text, Animated } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import { animateButtonPress } from "../../utils/animations";
import * as Haptics from "expo-haptics";

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
    fontFamily: "Chewy-Regular",
    textAlign: "center",
    lineHeight: 30,
    fontSize,
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
    borderRadius: 30,
    backgroundColor: pressed
      ? color.PRIMARY_BUTTON_PRESSED
      : color.PRIMARY_BUTTON,
    ...shadow,
  };

  return baseStyle;
}

function PrimaryButton({ onPress, fontSize, children, buttonSize }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, 0.9);
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, 1);
  };

  const handlePress = () => {
    onPress();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        style={({ pressed }) => getButtonStyle(buttonSize, pressed)}
        onPress={handlePress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Text style={getTextStyle(fontSize)}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}

export { PrimaryButton };
