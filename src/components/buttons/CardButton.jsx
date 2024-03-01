import { Pressable, View, StyleSheet, Animated, Image } from "react-native";
import { useRef } from "react";
import { color } from "../../utils/themes";
import { PrimaryText } from "../texts/PrimaryText";
import { animateButtonPress } from "../../utils/animations";
import { drinkImageMap } from "../../utils/maps";
import SCREEN_SIZE from "../../utils/screenSize";

const cardButtonBorderRadius = {
  SMALL: 24,
  MEDIUM: 24,
  LARGE: 48,
};

const cardBorderWidth = {
  SMALL: 3.5,
  MEDIUM: 4,
  LARGE: 7,
};

const cardTextSize = {
  SMALL: 2,
  MEDIUM: 2,
  LARGE: 8,
};

function CardButton({ onPress, imageSrc, children, style }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, 0.9);
    animateButtonPress(shadowOpacity, 0.25);
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, 1);
    animateButtonPress(shadowOpacity, 0);
    onPress();
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
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <View style={styles.cardImageWrapper}>
          <Image
            style={styles.cardImage}
            source={drinkImageMap[imageSrc]}
          ></Image>
        </View>
        <View style={styles.cardTextWrapper}>
          <PrimaryText size={cardTextSize[SCREEN_SIZE]}>{children}</PrimaryText>
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
    flex: 1,
    flexDirection: "row",
    borderRadius: cardButtonBorderRadius[SCREEN_SIZE],
    borderWidth: cardBorderWidth[SCREEN_SIZE],
    borderColor: color.DARK_BLUE,
    backgroundColor: color.WHITE,
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
    objectFit: "contain",
  },
});
