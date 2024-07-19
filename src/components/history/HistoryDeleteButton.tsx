import { Pressable, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { color } from "@/utils/constants";
import {
  historyButtonIconSize,
  historyButtonRadius,
} from "@/utils/constants/components/history";
import { animateButtonPress, animatedScaleValue } from "@/utils/animations";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { useDrinkManager } from "@/hooks";

function HistoryDeleteButton({ item }: { item: DrinkHistoryItem }) {
  const scaleValue = useRef(animatedScaleValue(1)).current;

  const [_, removeDrink] = useDrinkManager();

  const handleOnPress = () => {
    removeDrink(item);
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, animatedScaleValue(0.85));
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, animatedScaleValue(1));
  };

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        {
          transform: [{ scale: scaleValue }],
        },
      ]}
    >
      <Pressable
        style={styles.buttonBase}
        onPress={handleOnPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Ionicons
          color={color.WHITE}
          size={historyButtonIconSize}
          name="trash"
        />
      </Pressable>
    </Animated.View>
  );
}

export { HistoryDeleteButton };

const styles = StyleSheet.create({
  buttonWrapper: {
    left: "15%",
    top: "10%",
    width: "70%",
    height: "80%",
  },
  buttonBase: {
    width: "100%",
    height: "100%",
    backgroundColor: color.RED,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: historyButtonRadius,
  },
});
