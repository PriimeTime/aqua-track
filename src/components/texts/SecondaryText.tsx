import {
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  ColorValue,
} from "react-native";

import { color, fontFamily } from "@/utils/constants";

function getTextStyle(
  fontSize: number,
  colorParam?: ColorValue
): StyleProp<TextStyle> {
  const colorVal = colorParam || color.LIGHTBLUE;

  return {
    ...styles.baseText,
    fontSize,
    color: colorVal,
  };
}

interface SecondaryTextProps {
  children: React.ReactNode;
  fontSize: number;
  color?: ColorValue;
}

function SecondaryText({ children, fontSize, color }: SecondaryTextProps) {
  return (
    <Text numberOfLines={1} style={getTextStyle(fontSize, color)}>
      {children}
    </Text>
  );
}

export { SecondaryText };

const styles = StyleSheet.create({
  baseText: {
    fontFamily: fontFamily.DEFAULT,
    color: color.LIGHTBLUE,
  },
});
