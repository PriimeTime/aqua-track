import { Pressable, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color, SCREEN_SIZE } from "@/utils/constants";
import { removeFromHistory } from "@/store/drinkHistory";
import { useDispatch } from "react-redux";
import { animateButtonPress } from "@/utils/animations";
import { type UID } from "@/types/UID";
import { animatedScaleValue } from "@/utils/animations/animatedScaleValue";

const buttonIconSize = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 45,
};

const buttonBorderRadius = {
  SMALL: 10,
  MEDIUM: 15,
  LARGE: 25,
};

const getButtonStyle = () => ({
  ...styles.buttonBase,
  borderRadius: buttonBorderRadius[SCREEN_SIZE],
});

function HistoryDeleteButton({ itemID }: { itemID: UID }) {
  const scaleValue = useRef(animatedScaleValue(1)).current;
  const dispatch = useDispatch();

  const handleOnPress = () => {
    setTimeout(() => {
      dispatch(removeFromHistory(itemID));
    }, 150);
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
        style={getButtonStyle}
        onPress={handleOnPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Ionicons
          color={color.WHITE}
          size={buttonIconSize[SCREEN_SIZE]}
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
  },
});
