import { Pressable, Animated, View, StyleSheet } from "react-native";
import { useRef } from "react";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ScreenSize } from "@/enums/maps/ScreenSize";

import { animateButtonPress, animatedScaleValue } from "@/utils/animations";
import { color, shadow, SCREEN_SIZE } from "@/utils/constants";

const buttonSizes = {
  SMALL: 48,
  MEDIUM: 64,
  LARGE: 128,
};

const iconSizes = {
  SMALL: 25,
  MEDIUM: 35,
  LARGE: 70,
};

const getButtonStyle = (screenSize: ScreenSize) => {
  const size = buttonSizes[screenSize];
  const borderRadius = size / 2; // Create circle

  return {
    width: size,
    height: size,
    borderRadius,
    ...styles.baseButton,
  };
};

interface SettingsButtonProps {
  onPress: () => void;
}

function SettingsButton({ onPress }: SettingsButtonProps) {
  const scaleValue = useRef(animatedScaleValue(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, animatedScaleValue(0.8));
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, animatedScaleValue(1));
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { transform: [{ scale: scaleValue }] },
          getButtonStyle(SCREEN_SIZE),
        ]}
      >
        <Pressable
          onPress={handlePress}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Ionicons
            color={color.BLUE}
            size={iconSizes[SCREEN_SIZE]}
            name="settings"
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

export { SettingsButton };

const styles = StyleSheet.create({
  baseButton: {
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
    backgroundColor: color.WHITE,
  },
  container: {
    alignItems: "flex-end",
  },
});
