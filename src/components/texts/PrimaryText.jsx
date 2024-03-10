import { Text } from "react-native";
import { color } from "../../utils/themes";

function getTextStyle(size, colorParam) {
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

  const { fontSize } = fontValues[size];

  let colorVal = color.DARK_BLUE;

  if (colorParam) {
    colorVal = colorParam;
  }

  const baseStyle = {
    fontFamily: "Chewy-Regular",
    fontSize,
    color: colorVal,
  };

  return baseStyle;
}

function PrimaryText({ children, size, color }) {
  return (
    <Text numberOfLines={1} style={getTextStyle(size, color)}>
      {children}
    </Text>
  );
}

export { PrimaryText };
