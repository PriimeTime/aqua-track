import { Text } from "react-native";
import { color } from "../../utils/themes";

function getTextStyle(size, colorParam) {
  const fontValues = {
    1: { fontSize: 20 },
    2: { fontSize: 24 },
    3: { fontSize: 36 },
    4: { fontSize: 48 },
  };

  const { fontSize } = fontValues[size];

  let colorVal = color.PRIMARY_TEXT;

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
  return <Text style={getTextStyle(size, color)}>{children}</Text>;
}

export { PrimaryText };
