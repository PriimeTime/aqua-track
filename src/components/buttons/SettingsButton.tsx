import { Pressable, Animated, View, StyleSheet } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ms, ScaledSheet } from "react-native-size-matters";

import { animateButtonPress, animatedScaleValue } from "@/utils/animations";
import { color, shadow } from "@/utils/constants";

interface SettingsButtonProps {
  onPress: () => void;
}

function SettingsButton({ onPress }: SettingsButtonProps) {
  const scaleValue = useRef(animatedScaleValue(1)).current;

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
          scaledStyles.baseButton,
        ]}
      >
        <Pressable
          onPress={onPress}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Ionicons color={color.BLUE} size={ms(25)} name="menu" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

export { SettingsButton };

const scaledStyles = ScaledSheet.create({
  baseButton: {
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
    backgroundColor: color.WHITE,
    width: "48@ms",
    height: "48@ms",
    borderRadius: "24@ms",
  },
});

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
});
