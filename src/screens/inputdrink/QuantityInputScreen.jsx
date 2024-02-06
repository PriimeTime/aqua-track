import { View, StyleSheet, Animated, PanResponder } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory } from "../../store/store";
import { drinkTypeList } from "../../utils/maps";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { PrimaryText } from "../../components/texts/PrimaryText";
import { QuantityInputBottle } from "./QuantityInputBottle";
import { color } from "../../utils/themes";
import { BackButton } from "../../components/buttons/BackButton";

import {
  inputBottleSizeInMilliliters,
  incrementValue,
} from "../../utils/constants";

/**
 * Debounce function to control
 * haptic feedback intensity
 */
const useDebouncedCallback = (callback, delay) => {
  const lastCall = useRef(0);

  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall.current > delay) {
      lastCall.current = now;
      callback(...args);
    }
  };
};

function QuantityInputScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const drinkType = useSelector((state) => state.drinkType.value);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const debouncedHapticFeedback = useDebouncedCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, 25);

  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 125,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 125,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const [quantityValue, setQuantityValue] = useState(0);
  const [heightVal, setHeightVal] = useState(0);
  const [hasQuantityValueChanged, setHasQuantityValueChanged] = useState(false);

  useEffect(() => {
    debouncedHapticFeedback();
  }, [quantityValue]);

  const scaleFactor = 0.55; // Adjust this value as needed for sensitivity

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const dragDistance = gestureState.dy * scaleFactor;

      // Calculate the height of the water based on the drag
      const newHeight = Math.max(0, Math.min(100, heightVal - dragDistance));
      setHeightVal(newHeight);

      const inputBottleObject = inputBottleSizeInMilliliters.filter(
        (item) => item.drinkType === drinkType.drinkType
      )[0];

      const inputBottleSize = inputBottleObject.size;

      const bottleSize = (Math.round(newHeight) * inputBottleSize) / 100;
      const quantityVal =
        Math.ceil(bottleSize / incrementValue) * incrementValue;

      setQuantityValue(quantityVal);
      setHasQuantityValueChanged(true);
    },
  });

  useFocusEffect(
    useCallback(() => {
      // Reset the hasQuantityValueChanged to false when screen is focused
      setHasQuantityValueChanged(false);

      return () => {
        // Optional: Any cleanup actions go here
      };
    }, [])
  );

  const handleContinue = () => {
    if ((hasQuantityValueChanged && quantityValue !== 0) || quantityValue > 0) {
      dispatch(addToHistory({ ...drinkType, quantity: quantityValue }));
      navigation.navigate("home");
    } else {
      triggerAnimation();
    }
  };

  const drinkTypeObject = drinkTypeList.find(
    (item) => item.typeID === drinkType.typeID
  );
  const drinkTypeLabel = drinkTypeObject
    ? drinkTypeObject.label.toLowerCase() + " "
    : "";

  return (
    <LinearGradient
      colors={[
        color.APP_PRIMARY_BACKGROUND_FIRST_GRADIENT,
        color.APP_PRIMARY_BACKGROUND_SECOND_GRADIENT,
      ]}
      style={[styles.wrapper, { paddingTop: insets.top }]}
    >
      <View style={styles.backButton}>
        <BackButton></BackButton>
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText size={3}>How much {drinkTypeLabel}?</PrimaryText>
        </Animated.View>
      </View>
      <View style={styles.cupWrapper} {...panResponder.panHandlers}>
        <QuantityInputBottle
          heightVal={heightVal}
          liquidColor={drinkType.color}
        ></QuantityInputBottle>
      </View>
      <View style={styles.amountDrank}>
        <PrimaryText size={4}>{quantityValue} ml</PrimaryText>
      </View>
      <View style={styles.buttonWrapper}>
        <PrimaryButton onPress={handleContinue}>
          {"Add this amount".toUpperCase()}
        </PrimaryButton>
      </View>
    </LinearGradient>
  );
}

export { QuantityInputScreen };

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
  },
  backButton: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    height: "10%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  amountDrank: {
    height: "10%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  cupWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "55%",
    width: "90%",
    left: "5%",
  },
  buttonWrapper: {
    height: "15%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});
