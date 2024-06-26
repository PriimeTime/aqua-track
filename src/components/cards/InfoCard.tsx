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

const getCardStyle = (
  height: number,
  width: number,
  borderRadius: number,
  secondary: boolean
): StyleProp<ViewStyle> => {
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
  fontSize: number,
  secondary: boolean
): StyleProp<TextStyle> => {
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
  fontSize: number;
  height: number;
  width: number;
  borderRadius: number;
  secondary?: boolean;
  children: React.ReactNode;
}

function InfoCard({
  fontSize,
  height,
  width,
  borderRadius,
  secondary = false,
  children,
}: InfoCardProps) {
  return (
    <View style={getCardStyle(height, width, borderRadius, secondary)}>
      <Text style={getTextStyle(fontSize, secondary)}>{children}</Text>
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
