import { Pressable, Text, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import { color, shadow, SCREEN_SIZE, fontFamily } from "../../utils/constants";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { animateButtonPress } from "../../utils/animations";
import { animatedScaleValue } from "@/utils/animations/animatedScaleValue";

const fontSizes = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 40,
};

const buttonDimensions = {
  SMALL: { width: 85, height: 48, borderRadius: 24 },
  MEDIUM: { width: 110, height: 60, borderRadius: 40 },
  LARGE: { width: 170, height: 90, borderRadius: 50 },
};

const getTextStyle = () => ({
  ...styles.text,
  fontSize: fontSizes[SCREEN_SIZE],
});

const getButtonStyle = () => ({
  ...styles.button,
  width: buttonDimensions[SCREEN_SIZE].width,
  height: buttonDimensions[SCREEN_SIZE].height,
  borderRadius: buttonDimensions[SCREEN_SIZE].borderRadius,
});

function BackButton() {
  const scaleValue = useRef(animatedScaleValue(1)).current;
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.dispatch(popAction);
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, animatedScaleValue(0.9));
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, animatedScaleValue(1));
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        style={getButtonStyle()}
        onPress={handlePress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Text style={getTextStyle()}>{"Back".toUpperCase()}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.DEFAULT,
    textAlign: "center",
    letterSpacing: 1.2,
    color: color.LIGHTBLUE,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
    backgroundColor: color.WHITE,
  },
});

export { BackButton };
