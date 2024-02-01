import { Text } from "react-native";

function getHeaderStyle(size) {
  const fontValues = {
    1: { fontSize: 35 },
    2: { fontSize: 50 },
    3: { fontSize: 75 },
  };

  const { fontSize } = fontValues[size];

  const baseStyle = {
    fontWeight: 300,
    fontSize,
  };

  return baseStyle;
}

function PrimaryText({ children, size }) {
  return <Text style={getHeaderStyle(size)}>{children}</Text>;
}

export { PrimaryText };
