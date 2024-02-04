import { Pressable, Text, View, StyleSheet, Animated } from "react-native";
import { useRef } from "react";
import { color, shadow } from "../../utils/themes";
import { PrimaryText } from "../texts/PrimaryText";
import Ionicons from "@expo/vector-icons/Ionicons";

function getButtonStyle(selected) {
  const baseStyle = {
    width: "90%",
    left: "5%",
    top: "10%",
    height: "80%",
    borderRadius: 30,
    borderWidth: 5,
    borderColor: color.CARD_BUTTON,
    backgroundColor: selected ? "#c6dbff" : color.APP_PRIMARY_BACKGROUND,
    /**
     * Give selected item a very slight shadow
     */
    ...(selected && {
      ...shadow.very_slight_shadow,
    }),
  };

  return baseStyle;
}

function CardButton({ onPress, buttonIcon, children, selected }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateScale = (newValue) => {
    Animated.timing(scaleValue, {
      toValue: newValue,
      duration: 75,
      useNativeDriver: true,
    }).start();
  };

  const handleOnPressIn = () => {
    animateScale(0.9);
  };

  const handleOnPressOut = () => {
    animateScale(1);
  };

  return (
    <Animated.View
      style={[styles.wrapper, { transform: [{ scale: scaleValue }] }]}
    >
      <Pressable
        style={getButtonStyle(selected)}
        onPress={onPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <View style={styles.container}>
          <Ionicons
            color={color.SECONDARY_BUTTON}
            size={25}
            name={buttonIcon}
          ></Ionicons>
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
  wrapper: { height: "25%", width: "50%" },
  container: {
    top: "15%",
    left: "7.5%",
  },
  cardTextWrapper: {
    top: "5%",
    left: "2.5%",
  },
});
