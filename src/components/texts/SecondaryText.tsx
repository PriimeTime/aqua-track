import {
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  ColorValue,
} from "react-native";
import { color, fontFamily } from "../../utils/constants";

const fontValues = {
  1: { fontSize: 12 },
  2: { fontSize: 14 },
  3: { fontSize: 16 },
  4: { fontSize: 18 },
  5: { fontSize: 20 },
  6: { fontSize: 24 },
  7: { fontSize: 36 },
  8: { fontSize: 48 },
};

function getTextStyle(
  size: number,
  colorParam?: ColorValue
): StyleProp<TextStyle> {
  const defaultFontValue = fontValues[1].fontSize;
  const fontSize =
    fontValues[size as keyof typeof fontValues].fontSize || defaultFontValue;
  const colorVal = colorParam || color.LIGHTBLUE;

  return {
    ...styles.baseText,
    fontSize,
    color: colorVal,
  };
}

interface SecondaryTextProps {
  children: React.ReactNode;
  size: number;
  color?: ColorValue;
}

function SecondaryText({ children, size, color }: SecondaryTextProps) {
  return (
    <Text numberOfLines={1} style={getTextStyle(size, color)}>
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
