import { Pressable, Text, Animated } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { animateButtonPress } from "../../utils/animations";
import SCREEN_SIZE from "../../utils/screenSize";

const fontSizes = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 40,
};

const buttonWidth = {
  SMALL: 85,
  MEDIUM: 110,
  LARGE: 170,
};

const buttonHeight = {
  SMALL: 48,
  MEDIUM: 60,
  LARGE: 90,
};

const buttonBorderRadius = {
  SMALL: 24,
  MEDIUM: 40,
  LARGE: 50,
};

function getTextStyle() {
  const baseStyle = {
    fontFamily: "Chewy-Regular",
    fontSize: fontSizes[SCREEN_SIZE],
    textAlign: "center",
    letterSpacing: 1.2,
    color: color.LIGHTBLUE,
  };

  return baseStyle;
}

function getButtonStyle(pressed) {
  const baseStyle = {
    width: buttonWidth[SCREEN_SIZE],
    height: buttonHeight[SCREEN_SIZE],
    borderRadius: buttonBorderRadius[SCREEN_SIZE],
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
    backgroundColor: color.WHITE,
  };

  return baseStyle;
}

function BackButton({ buttonSize }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.dispatch(popAction);
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, 0.9);
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, 1);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        style={({ pressed }) => getButtonStyle(buttonSize, pressed)}
        onPress={handlePress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Text style={getTextStyle()}>{"Back".toUpperCase()}</Text>
      </Pressable>
    </Animated.View>
  );
}

export { BackButton };
