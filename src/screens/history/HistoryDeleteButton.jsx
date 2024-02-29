import { Pressable, Animated, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";

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

function HistoryDeleteButton({ size }) {
  const buttonIconSize = {
    SMALL: 20,
    MEDIUM: 25,
    LARGE: 45,
  };

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        // {
        //   transform: [{ scale: scaleValue }],
        // },
      ]}
    >
      <Pressable
        style={getButtonStyle(size)}
        // onPress={handlePress}
        // onPressIn={handleOnPressIn}
        // onPressOut={handleOnPressOut}
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
