import { Pressable, Text } from "react-native";
import { color, shadow } from "../../utils/themes";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

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
    // TODO: outsource shadow into const object in themes
    ...shadow.shadow,
    backgroundColor: color.SECONDARY_BUTTON,
  };

  return baseStyle;
}

function BackButton({ buttonSize }) {
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.dispatch(popAction);
  };

  return (
    <Pressable
      style={({ pressed }) => getButtonStyle(buttonSize, pressed)}
      onPress={handlePress}
    >
      <Text style={getTextStyle()}>{"Back".toUpperCase()}</Text>
    </Pressable>
  );
}

export { BackButton };
