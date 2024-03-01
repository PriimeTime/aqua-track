import { Text } from "react-native";
import { color } from "../../utils/themes";

function getTextStyle(size, colorParam) {
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

  const { fontSize } = fontValues[size];

  let colorVal = color.LIGHTBLUE;

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

function SecondaryText({ children, size, color }) {
  return <Text style={getTextStyle(size, color)}>{children}</Text>;
}

export { SecondaryText };
