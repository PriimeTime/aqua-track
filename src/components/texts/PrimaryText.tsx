import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ColorValue,
} from "react-native";

import { color, fontFamily } from "@/utils/constants";

function getTextStyle(
  fontSize: number,
  colorParam?: ColorValue
): StyleProp<TextStyle> {
  const colorVal = colorParam || color.DARK_BLUE;

  return {
    ...styles.text,
    fontSize,
    color: colorVal,
  };
}

interface PrimaryTextProps {
  children: React.ReactNode;
  fontSize: number;
  color?: ColorValue;
  numberOfLines?: number;
}

function PrimaryText({
  children,
  fontSize,
  color,
  numberOfLines,
}: PrimaryTextProps) {
  return (
    <Text
      numberOfLines={numberOfLines ?? undefined}
      style={getTextStyle(fontSize, color)}
    >
      {children}
    </Text>
  );
}

export { PrimaryText };

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.DEFAULT,
    color: color.DARK_BLUE,
  },
});
