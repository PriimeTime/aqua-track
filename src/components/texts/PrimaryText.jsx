import { Text } from "react-native";

function getTextStyle(size) {
  const fontValues = {
    1: { fontSize: 20 },
    2: { fontSize: 24 },
    3: { fontSize: 36 },
    4: { fontSize: 48 },
  };

  const { fontSize } = fontValues[size];

  const baseStyle = {
    fontFamily: "Chewy-Regular",
    fontSize,
  };

  return baseStyle;
}

function PrimaryText({ children, size }) {
  return <Text style={getTextStyle(size)}>{children}</Text>;
}

export { PrimaryText };
