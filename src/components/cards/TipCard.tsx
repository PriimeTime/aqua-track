import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
  Pressable,
  Animated,
  DimensionValue,
} from "react-native";

import { color, fontFamily } from "@/utils/constants";
import { animatedScaleValue, springAnimation } from "@/utils/animations";
import { tipCardBorderRadius } from "@/utils/constants/components/cards";

const getCardStyle = (
  height: DimensionValue,
  width: DimensionValue
): StyleProp<ViewStyle> => {
  let backgroundColor: ColorValue = color.WHITE;

  return [
    styles.baseCard,
    {
      height,
      width,
      borderRadius: tipCardBorderRadius,
      backgroundColor,
    },
  ];
};

interface TipCardProps {
  height?: DimensionValue;
  width?: DimensionValue;
  borderRadius?: Animated.AnimatedValue | number;
  onPress: () => void;
  children: React.ReactNode;
}

function TipCard({
  height = "auto",
  width = "auto",
  onPress,
  children,
}: TipCardProps) {
  const scaleValue = useRef(animatedScaleValue(0)).current;

  const handleOnPressIn = () => {
    const configObject = { toValue: 0 };
    springAnimation(scaleValue, configObject, () => {
      onPress();
    });
  };

  const handleOnPressOut = () => {
    const configObject = { toValue: 1 };

    springAnimation(scaleValue, configObject);
  };

  useEffect(() => {
    scaleValue.setValue(1);
  }, []);

  return (
    <Pressable onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
      <Animated.View
        style={[
          getCardStyle(height, width),
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export { TipCard };

const styles = StyleSheet.create({
  baseCard: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  baseText: {
    fontFamily: fontFamily.DEFAULT,
  },
});
