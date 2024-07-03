import {
  Pressable,
  Text,
  Animated,
  StyleSheet,
  View,
  ActivityIndicator,
  ColorValue,
  TextStyle,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRef } from "react";

import { color, fontFamily, shadow } from "@/utils/constants";
import {
  primaryButtonFontSize,
  primaryButtonRadius,
  primaryButtonWrapperHeight,
} from "@/utils/constants/components/buttons";
import { animateButtonPress, animatedScaleValue } from "@/utils/animations";

const getTextStyle = (fontSize?: number) => ({
  ...styles.text,
  fontSize: fontSize || primaryButtonFontSize,
});

const getButtonStyle = (pressed?: boolean, btnColor?: ColorValue) => {
  let bgColor = btnColor || (pressed ? color.DARK_BLUE : color.BLUE);

  return {
    ...styles.button,
    borderRadius: primaryButtonRadius,
    backgroundColor: bgColor,
  };
};

/**
 *
 * @param {*} custom - controls if text should be customized or not
 *
 * By default, custom == false and the style is defined meaning
 * you should use PrimaryButton wrapped around a string.
 *
 * If custom == true, you can use PrimaryButton wrapped around any component
 * that you could also use wrapped in a regular Button component.
 */

type PrimaryButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  btnColor?: ColorValue;
  fontSize?: number;
  textStyle?: TextStyle;
  custom?: boolean;
  isLoading?: boolean;
  customStyles?: StyleSheet.NamedStyles<unknown>;
};

function PrimaryButton({
  btnColor,
  onPress,
  fontSize,
  children,
  textStyle,
  custom,
  isLoading,
  customStyles,
}: PrimaryButtonProps) {
  const scaleValue = useRef(animatedScaleValue(1)).current;

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, animatedScaleValue(0.9));
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, animatedScaleValue(1));
  };

  const handlePress = () => {
    if (!isLoading) {
      onPress();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const defaultContent = (
    <View style={styles.textWrapper}>
      <Text style={[getTextStyle(fontSize), textStyle]}>{children}</Text>
    </View>
  );

  const loadingContent = (
    <View style={styles.textWrapper}>
      <ActivityIndicator size="large" color={color.WHITE} />
    </View>
  );

  const renderContent = (): React.JSX.Element | React.ReactNode => {
    if (isLoading) {
      return loadingContent;
    } else if (custom) {
      return children;
    } else {
      return defaultContent;
    }
  };

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        {
          transform: [{ scale: scaleValue }],
        },
        customStyles,
      ]}
    >
      <Pressable
        style={({ pressed }) => getButtonStyle(pressed, btnColor)}
        onPress={handlePress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
        disabled={isLoading}
      >
        {renderContent}
      </Pressable>
    </Animated.View>
  );
}

export { PrimaryButton };

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: "center",
    height: primaryButtonWrapperHeight,
    width: "100%",
  },
  textWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fontFamily.DEFAULT,
    textAlign: "center",
    letterSpacing: 1.2,
    color: color.WHITE,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    height: "75%",
    ...shadow,
  },
});
