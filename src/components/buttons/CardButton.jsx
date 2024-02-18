import { Pressable, View, StyleSheet, Animated, Image } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import { PrimaryText } from "../texts/PrimaryText";
import { animateButtonPress } from "../../utils/animations";
import waterbottle from "../../../assets/icons/drinks/water-bottle.png";
import tea from "../../../assets/icons/drinks/tea.png";
import can from "../../../assets/icons/drinks/can.png";
import beer from "../../../assets/icons/drinks/beer.png";
import winebottle from "../../../assets/icons/drinks/wine-bottle.png";
import liquor from "../../../assets/icons/drinks/liquor.png";
import coffeecup from "../../../assets/icons/drinks/coffee-cup.png";

const drinkImageMap = {
  waterbottle,
  tea,
  can,
  beer,
  winebottle,
  liquor,
  coffeecup,
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
          <Image
            style={styles.cardImage}
            source={drinkImageMap[imageSrc]}
          ></Image>
        </View>
        <View style={styles.cardTextWrapper}>
          <PrimaryText size={1}>{children}</PrimaryText>
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
    borderRadius: 24,
    borderWidth: 2,
    borderColor: color.CARD_BUTTON_BORDER,
    backgroundColor: color.CARD_BUTTON_BACKGROUND,
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
