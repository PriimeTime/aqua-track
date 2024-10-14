import { Pressable, Animated, View, StyleSheet } from "react-native";
import { useRef } from "react";
// import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";

import { animateButtonPress, animatedScaleValue } from "@/utils/animations";
import { color, shadow } from "@/utils/constants";
import {
  settingsButtonSize,
  settingsIconSize,
} from "@/utils/constants/components/buttons";

interface SettingsButtonProps {
  onPress: () => void;
}

function SettingsButton({ onPress }: SettingsButtonProps) {
  const scaleValue = useRef(animatedScaleValue(1)).current;

  const handlePress = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        style={[{ transform: [{ scale: scaleValue }] }, styles.baseButton]}
      >
        <Pressable
          onPress={handlePress}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Ionicons
            color={color.BLUE}
            size={settingsIconSize}
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
    width: settingsButtonSize,
    height: settingsButtonSize,
    borderRadius: settingsButtonSize / 2,
  },
  container: {
    alignItems: "flex-end",
  },
});
