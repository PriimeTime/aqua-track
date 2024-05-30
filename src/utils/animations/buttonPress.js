import { Animated } from "react-native";

const animateButtonPress = (oldValue, newValue) => {
  Animated.timing(oldValue, {
    toValue: newValue,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

export { animateButtonPress };
