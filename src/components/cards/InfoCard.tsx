import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
} from "react-native";

import { color, fontFamily } from "@/utils/constants";

const heightValues = {
  1: 25,
  2: 25,
  3: 30,
  4: 40,
  5: 50,
  6: 60,
};

const widthValues = {
  1: 50,
  2: 60,
  3: 80,
  4: 100,
  5: 120,
  6: 140,
};

const radiusValues = {
  1: 7.5,
  2: 10,
  3: 10,
  4: 12.5,
  5: 15,
  6: 20,
};

const fontSizes = {
  1: 14,
  2: 16,
  3: 18,
  4: 22,
  5: 24,
  6: 28,
};

const getCardStyle = (
  size: number,
  secondary: boolean
): StyleProp<ViewStyle> => {
  const height = heightValues[size as keyof typeof heightValues];
  const width = widthValues[size as keyof typeof widthValues];
  const borderRadius = radiusValues[size as keyof typeof radiusValues];

  let backgroundColor: ColorValue = color.BLUE;
  if (secondary) {
    backgroundColor = color.LIGHTBLUE_OPACITY_0_2;
  }

  return [
    styles.baseCard,
    {
      height,
      width,
      borderRadius,
      backgroundColor,
    },
  ];
};

const getTextStyle = (
  size: number,
  secondary: boolean
): StyleProp<TextStyle> => {
  const fontSize = fontSizes[size as keyof typeof fontSizes];
  let textColor: ColorValue = color.WHITE;

  if (secondary) {
    textColor = color.BLUE;
  }

  return [
    styles.baseText,
    {
      color: textColor,
      fontSize,
    },
  ];
};

interface InfoCardProps {
  size: number;
  secondary?: boolean;
  children: React.ReactNode;
}

function InfoCard({ size, secondary = false, children }: InfoCardProps) {
  return (
    <View style={getCardStyle(size, secondary)}>
      <Text style={getTextStyle(size, secondary)}>{children}</Text>
    </View>
  );
}

export { InfoCard };

const styles = StyleSheet.create({
  baseCard: {
    justifyContent: "center",
    alignItems: "center",
  },
  baseText: {
    fontFamily: fontFamily.DEFAULT,
  },
});
