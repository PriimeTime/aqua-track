import { color } from "@/utils/constants";
import { useEffect } from "react";
import { View, Animated } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface HorizontalLoadingIndicatorProps {
  duration: number;
}

/**
 * A horizontal loading indicator
 *
 * @param duration - duration of the loading animation in ms
 * @returns A horizontal loading indicator that fills up the container
 */

function HorizontalLoadingIndicator({
  duration,
}: HorizontalLoadingIndicatorProps) {
  const animationValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animationValue]);

  const widthInterpolation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={scaledStyles.container}>
      <Animated.View
        style={[
          scaledStyles.loadingBar,
          {
            width: widthInterpolation,
          },
        ]}
      />
    </View>
  );
}

const scaledStyles = ScaledSheet.create({
  loadingBar: {
    height: "100%",
    backgroundColor: color.DARK_BLUE,
    borderRadius: "5@ms",
  },
  container: {
    width: "80%",
    height: "50@ms",
    backgroundColor: color.BLUE,
    borderRadius: "25@ms",
    overflow: "hidden",
    alignSelf: "center",
  },
});

export { HorizontalLoadingIndicator };
