import { Animated } from "react-native";

const animateButtonPress = (
  oldValue: Animated.Value | Animated.ValueXY,
  newValue: Animated.Value | Animated.ValueXY
) => {
  Animated.timing(oldValue, {
    toValue: newValue,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

export { animateButtonPress };
