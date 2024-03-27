import { Pressable, Text, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import { animateButtonPress } from "../../utils/animations";
import * as Haptics from "expo-haptics";
import SCREEN_SIZE from "../../utils/screenSize";

const textSize = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 60,
};

const buttonBorderRadius = {
  SMALL: 30,
  MEDIUM: 30,
  LARGE: 60,
};

function getTextStyle() {
  const baseStyle = {
    fontFamily: "Chewy-Regular",
    textAlign: "center",
    fontSize: textSize[SCREEN_SIZE],
    letterSpacing: 1.2,
    color: "white",
  };

  return baseStyle;
}

function getButtonStyle(size, pressed) {
  const baseStyle = {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: buttonBorderRadius[SCREEN_SIZE],
    backgroundColor: pressed ? color.DARK_BLUE : color.BLUE,
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
    <Animated.View
      style={[
        styles.buttonWrapper,
        {
          transform: [{ scale: scaleValue }],
        },
      ]}
    >
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

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: "center",
    height: "50%",
    width: "100%",
  },
});
