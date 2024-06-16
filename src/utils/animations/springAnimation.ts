import { Animated } from "react-native";

const springAnimation = (
  scaleValue: Animated.Value,
  confObj?: Partial<Animated.SpringAnimationConfig>,
  callback?: () => void
) => {
  const defaultConfig: Animated.SpringAnimationConfig = {
    toValue: 0,
    speed: 30,
    useNativeDriver: true,
  };

  const finalConfig = { ...defaultConfig, ...confObj };

  Animated.spring(scaleValue, finalConfig).start(() => {
    if (callback) callback();
  });
};

export { springAnimation };
