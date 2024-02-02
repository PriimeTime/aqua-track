import { Text } from "react-native";

function getHeaderStyle(size) {
  const fontValues = {
    1: { fontSize: 25 },
    2: { fontSize: 30 },
    3: { fontSize: 35 },
    4: { fontSize: 40 },
    5: { fontSize: 45 },
  };

  const { fontSize } = fontValues[size];

  const baseStyle = {
    textAlign: "center",
    fontWeight: 500,
    fontSize,
  };

  return baseStyle;
}

function PrimaryHeader({ children, size }) {
  return <Text style={getHeaderStyle(size)}>{children}</Text>;
}

export { PrimaryHeader };
