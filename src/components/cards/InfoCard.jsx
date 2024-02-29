import { View, Text } from "react-native";
import { color } from "../../utils/themes";

function getCardStyle(size, secondary) {
  const heightValues = {
    1: { height: 25 },
    2: { height: 25 },
    3: { height: 30 },
    4: { height: 40 },
    5: { height: 50 },
    6: { height: 60 },
  };

  const widthValues = {
    1: { width: 50 },
    2: { width: 60 },
    3: { width: 80 },
    4: { width: 100 },
    5: { width: 120 },
    6: { width: 140 },
  };

  const radiusValues = {
    1: { borderRadius: 7.5 },
    2: { borderRadius: 10 },
    3: { borderRadius: 10 },
    4: { borderRadius: 12.5 },
    5: { borderRadius: 15 },
    6: { borderRadius: 20 },
  };

  const { height } = heightValues[size];
  const { width } = widthValues[size];
  const { borderRadius } = radiusValues[size];

  let backgroundColor = color.BLUE;

  if (secondary) {
    backgroundColor = color.LIGHTBLUE_OPACITY_0_2;
  }

  const baseStyle = {
    height,
    width,
    borderRadius,
    backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  };

  return baseStyle;
}

function getTextStyle(size, secondary) {
  const fontSizes = {
    1: { fontSize: 14 },
    2: { fontSize: 16 },
    3: { fontSize: 18 },
    4: { fontSize: 22 },
    5: { fontSize: 24 },
    6: { fontSize: 28 },
  };

  const { fontSize } = fontSizes[size];

  let textColor = color.WHITE;

  if (secondary) {
    textColor = color.BLUE;
  }

  const baseStyle = {
    color: textColor,
    fontSize,
    fontFamily: "Chewy-Regular",
  };

  return baseStyle;
}

function InfoCard({ size, secondary, children }) {
  return (
    <View style={getCardStyle(size, secondary)}>
      <Text style={getTextStyle(size, secondary)}>{children}</Text>
    </View>
  );
}

export { InfoCard };
