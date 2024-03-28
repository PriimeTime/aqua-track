import { Pressable, Text, Animated, StyleSheet, View } from "react-native";
import { useRef } from "react";
import { color, fontFamily, shadow } from "../../utils/themes";
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

const buttonWrapperHeight = {
  SMALL: 60,
  MEDIUM: 75,
  LARGE: 150,
};

function getTextStyle(fontSize) {
  const baseStyle = {
    fontFamily: fontFamily.DEFAULT,
    textAlign: "center",
    fontSize: textSize[SCREEN_SIZE],
    letterSpacing: 1.2,
    color: color.WHITE,
  };

  return baseStyle;
}

function getButtonStyle(size, pressed, btnColor) {
  let bgColor = "";

  if (btnColor) {
    bgColor = btnColor;
  } else {
    pressed ? (bgColor = color.DARK_BLUE) : (bgColor = color.BLUE);
  }

  const baseStyle = {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: buttonBorderRadius[SCREEN_SIZE],
    backgroundColor: bgColor,
    width: "100%",
    height: "75%",
    ...shadow,
  };

  return baseStyle;
}

/**
 *
 * @param {*} buttonColor
 * @returns the background color of the button
 */

/**
 *
 * @param {*} textStyle
 * @returns a style object with styles
 * that either expand the style prop inside <Text>
 * or overwrite existing styles inside of it
 */

/**
 *
 * @param {*} custom
 * @returns if the text inside the button should be
 * customized completely freely or not.
 *
 * By default, custom=false and the style is defined meaning
 * you should use PrimaryButton wrapped around a string.
 *
 * If custom=true, you can use PrimaryButton wrapped around any component
 * that you could also use wrapped in a regular Button component.
 */

function PrimaryButton({
  btnColor,
  onPress,
  fontSize,
  children,
  buttonSize,
  textStyle,
  custom,
}) {
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

  const defaultContent = (
    <View style={styles.textWrapper}>
      <Text style={[getTextStyle(fontSize), textStyle]}>{children}</Text>
    </View>
  );

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
        style={({ pressed }) => getButtonStyle(buttonSize, pressed, btnColor)}
        onPress={handlePress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        {custom && children}
        {!custom && defaultContent}
      </Pressable>
    </Animated.View>
  );
}

export { PrimaryButton };

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: "center",
    height: buttonWrapperHeight[SCREEN_SIZE],
    width: "100%",
  },
  textWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
