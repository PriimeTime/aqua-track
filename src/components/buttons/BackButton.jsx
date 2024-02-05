import { Pressable, Text, Animated } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { animateButtonPress } from "../../utils/animations";

function getTextStyle() {
  const baseStyle = {
    fontFamily: "Chewy-Regular",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 1.2,
    color: color.TERTIARY_TEXT,
  };

  return baseStyle;
}

function getButtonStyle(pressed) {
  const baseStyle = {
    width: 85,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
    backgroundColor: color.SECONDARY_BUTTON,
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
