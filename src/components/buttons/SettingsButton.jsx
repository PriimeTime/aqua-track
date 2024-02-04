import { Pressable, Text } from "react-native";
import { color } from "../../utils/themes";
import * as Haptics from "expo-haptics";

function getTextStyle() {
  const baseStyle = {
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 1.2,
    color: color.SECONDARY_TEXT,
  };

  return baseStyle;
}

// TODO: play spin animation when pressed
function getButtonStyle(pressed) {
  const baseStyle = {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    // TODO: outsource shadow into const object in themes
    shadowColor: color.SECONDARY_TEXT,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: color.SECONDARY_BUTTON,
  };

  return baseStyle;
}

function SettingsButton({ onPress, children, buttonSize }) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => getButtonStyle(buttonSize, pressed)}
      onPress={handlePress}
    >
      <Text style={getTextStyle()}>{children}</Text>
    </Pressable>
  );
}

export { SettingsButton };
