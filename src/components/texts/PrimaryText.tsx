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
  colorParam?: ColorValue,
  textAlign?: "left" | "center" | "right"
): StyleProp<TextStyle> {
  const colorVal = colorParam || color.DARK_BLUE;

  return {
    ...styles.text,
    textAlign: textAlign || "left",
    fontSize,
    color: colorVal,
  };
}

interface PrimaryTextProps {
  children: React.ReactNode;
  fontSize: number;
  color?: ColorValue;
  textAlign?: "left" | "center" | "right";
  numberOfLines?: number;
}

function PrimaryText({
  children,
  fontSize,
  color,
  numberOfLines,
  textAlign,
}: PrimaryTextProps) {
  return (
    <Text
      ellipsizeMode="tail"
      numberOfLines={numberOfLines ?? undefined}
      style={getTextStyle(fontSize, color, textAlign)}
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
