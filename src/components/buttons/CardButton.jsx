import { Pressable, Text, View, StyleSheet, Animated } from "react-native";
import { useState } from "react";
import { color, shadow } from "../../utils/themes";
import Ionicons from "@expo/vector-icons/Ionicons";

function getTextStyle(size) {
  const fontSizeValues = {
    1: { fontSize: 15 },
    2: { fontSize: 20 },
    3: { fontSize: 25 },
    4: { fontSize: 30 },
    5: { fontSize: 35 },
  };

  const fontSize = fontSizeValues[size] || 25;

  const baseStyle = {
    fontSize,
    fontWeight: 500,
    letterSpacing: 1.2,
    paddingTop: 10,
    color: color.SECONDARY_BUTTON,
  };

  return baseStyle;
}

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

function CardButton({ onPress, buttonIcon, fontSize, children, selected }) {
  const scaleValue = useState(new Animated.Value(1))[0];

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
          <Text style={getTextStyle(fontSize)}>{children}</Text>
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
});
