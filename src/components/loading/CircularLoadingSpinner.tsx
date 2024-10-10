import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Easing, ViewStyle } from "react-native";

import { color } from "@/utils/constants";

interface CircularLoadingSpinnerProps {
  spinnerColor?: string;
  width?: number;
  size?: number;
  style?: ViewStyle;
}

/**
 * Component that displays a circular loading spinner.
 *
 * @param spinnerColor - color of the spinner. Defaults to color.LIGHTBLUE
 * @param width - width of the spinner. Defaults to 5
 * @param size - size of the spinner. Defaults to 200px
 * @param style - styles applied to the spinner
 *
 * @returns a JSX element that renders a circular loading spinner
 *
 * @example
 *
 * <CircularLoadingSpinner
 * spinnerColor={color.LIGHTBLUE}
 * width={5}
 * size={200}
 * style={styles.spinner}
 * />
 */

const CircularLoadingSpinner = ({
  spinnerColor = color.LIGHTBLUE,
  width = 5,
  size = 200,
  style,
}: CircularLoadingSpinnerProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinning = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinning.start();

    return () => {
      spinning.stop();
    };
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        {
          transform: [{ rotate }],
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            borderColor: spinnerColor,
            borderWidth: width,
            width: size,
            height: size,
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 9999, // Makes the view a circle
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
  },
});

export { CircularLoadingSpinner };
