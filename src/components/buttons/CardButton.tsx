import {
  Pressable,
  View,
  StyleSheet,
  Animated,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useRef } from "react";

import { PrimaryText } from "@/components/texts";

import { color } from "@/utils/constants";
import {
  cardButtonBorderRadius,
  cardButtonBorderWidth,
  cardButtonFontSize,
} from "@/utils/constants/components/buttons";
import { animateButtonPress, animatedScaleValue } from "@/utils/animations";
import { drinkImageMap } from "@/utils/maps";

interface CardButtonProps {
  onPress: () => void;
  imageSrc: string;
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

function CardButton({ onPress, imageSrc, children, style }: CardButtonProps) {
  const scaleValue = useRef(animatedScaleValue(1)).current;
  const shadowOpacity = useRef(animatedScaleValue(0)).current;

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, animatedScaleValue(0.9));
    animateButtonPress(shadowOpacity, animatedScaleValue(0.25));
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, animatedScaleValue(1));
    animateButtonPress(shadowOpacity, animatedScaleValue(0));
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ scale: scaleValue }],
          shadowOpacity: shadowOpacity,
          shadowOffset: { width: 0, height: 4 },
        },
        style,
      ]}
    >
      <Pressable
        style={styles.cardButton}
        onPress={onPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <View style={styles.cardImageWrapper}>
          <Image style={styles.cardImage} source={drinkImageMap[imageSrc]} />
        </View>
        <View style={styles.cardTextWrapper}>
          <PrimaryText fontSize={cardButtonFontSize}>{children}</PrimaryText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export { CardButton };

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
  },
  cardButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: color.DARK_BLUE,
    backgroundColor: color.WHITE,
    borderRadius: cardButtonBorderRadius,
    borderWidth: cardButtonBorderWidth,
  },
  cardTextWrapper: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImageWrapper: {
    width: "48%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
