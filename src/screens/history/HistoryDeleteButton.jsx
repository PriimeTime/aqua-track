import { Pressable, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";
import { removeFromHistory } from "../../store/store";
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
    // backgroundColor: pressed ? color.DARK_BLUE : color.BLUE,
  };

  return baseStyle;
}

function HistoryDeleteButton({ itemID, size }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch();

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, 0.85);
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, 1);
    setTimeout(() => {
      dispatch(removeFromHistory({ id: itemID }));
    }, 150);
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