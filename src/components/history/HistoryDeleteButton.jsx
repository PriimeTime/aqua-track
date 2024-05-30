import { Pressable, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color, SCREEN_SIZE } from "../../utils/constants";
import { removeFromHistory } from "../../store/drinkHistory";
import { useDispatch } from "react-redux";
import { animateButtonPress } from "../../utils/animations";

function getButtonStyle(size, pressed) {
  const buttonBorderRadius = {
    SMALL: 10,
    MEDIUM: 15,
    LARGE: 25,
  };

  const baseStyle = {
    width: "100%",
    height: "100%",
    borderRadius: buttonBorderRadius[SCREEN_SIZE],
    backgroundColor: color.RED,
    justifyContent: "center",
    alignItems: "center",
  };

  return baseStyle;
}

function HistoryDeleteButton({ itemID, size }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch();

  const handleOnPress = () => {
    setTimeout(() => {
      dispatch(removeFromHistory({ id: itemID }));
    }, 150);
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, 0.85);
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, 1);
  };

  const buttonIconSize = {
    SMALL: 20,
    MEDIUM: 25,
    LARGE: 45,
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
        style={getButtonStyle(size)}
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
});
