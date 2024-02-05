import { Pressable, View, StyleSheet, Animated } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import { PrimaryText } from "../texts/PrimaryText";
import { animateButtonPress } from "../../utils/animations";
import Ionicons from "@expo/vector-icons/Ionicons";

function CardButton({ onPress, buttonIcon, children }) {
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
      ]}
    >
      <Pressable
        style={styles.cardButton}
        onPress={onPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <View style={styles.container}>
          <View style={styles.cardIconWrapper}>
            <Ionicons color={"black"} size={25} name={buttonIcon}></Ionicons>
          </View>
          <View style={styles.cardTextWrapper}>
            <PrimaryText size={1}>{children}</PrimaryText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export { CardButton };

const styles = StyleSheet.create({
  wrapper: { height: 125, width: "50%" },
  cardButton: {
    width: "90%",
    left: "5%",
    top: "10%",
    height: "80%",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: color.CARD_BUTTON_BORDER,
    backgroundColor: color.CARD_BUTTON_BACKGROUND,
  },
  container: {
    width: "85%",
    left: "12.5%",
    height: "90%",
    top: "2.5%",
    flexDirection: "row",
  },
  cardTextWrapper: {
    width: "50%",
    height: "80%",
    top: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardIconWrapper: {
    width: "50%",
    height: "80%",
    top: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});
