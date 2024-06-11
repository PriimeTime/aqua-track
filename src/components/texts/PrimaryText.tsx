import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ColorValue,
} from "react-native";

import { color, fontFamily } from "@/utils/constants";

const fontValues = {
  1: { fontSize: 22 },
  2: { fontSize: 24 },
  3: { fontSize: 26 },
  4: { fontSize: 28 },
  5: { fontSize: 32 },
  6: { fontSize: 36 },
  7: { fontSize: 48 },
  8: { fontSize: 64 },
  9: { fontSize: 72 },
  10: { fontSize: 86 },
  11: { fontSize: 92 },
};

function getTextStyle(
  size: number,
  colorParam?: ColorValue
): StyleProp<TextStyle> {
  const fontSize = fontValues[size as keyof typeof fontValues].fontSize;
  const colorVal = colorParam || color.DARK_BLUE;

  return {
    ...styles.text,
    fontSize,
    color: colorVal,
  };
}

interface PrimaryTextProps {
  children: React.ReactNode;
  size: number;
  color?: ColorValue;
}

function PrimaryText({ children, size, color }: PrimaryTextProps) {
  return (
    <Text numberOfLines={1} style={getTextStyle(size, color)}>
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
