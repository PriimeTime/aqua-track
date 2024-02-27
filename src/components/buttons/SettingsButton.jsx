import { Pressable, Animated, View } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { animateButtonPress } from "../../utils/animations";

const buttonSizes = {
  SMALL: 48,
  MEDIUM: 64,
  LARGE: 128,
};

const buttonRadius = {
  SMALL: 24,
  MEDIUM: 32,
  LARGE: 128,
};

const iconSize = {
  SMALL: 25,
  MEDIUM: 35,
  LARGE: 70,
};

// TODO: play spin animation when pressed
function getButtonStyle(pressed) {
  const size = buttonSizes[SCREEN_SIZE];
  const radius = buttonRadius[SCREEN_SIZE];

  const baseStyle = {
    width: size,
    height: size,
    borderRadius: radius,
    alignItems: "center",
    justifyContent: "center",
    // TODO: outsource shadow into const object in themes
    ...shadow,
    backgroundColor: color.SECONDARY_BUTTON,
  };

  return baseStyle;
}

function SettingsButton({ onPress, children, buttonSize }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, 0.8);
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, 1);
  };

  return (
    <View style={{ alignItems: "flex-end" }}>
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleValue }],
          },
          getButtonStyle(buttonSize),
        ]}
      >
        <Pressable
          onPress={handlePress}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Ionicons
            color={color.SECONDARY_TEXT}
            size={iconSize[SCREEN_SIZE]}
            name="settings"
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

export { SettingsButton };
