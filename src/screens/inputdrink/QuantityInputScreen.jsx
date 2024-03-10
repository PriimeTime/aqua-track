import { View, StyleSheet, Animated, PanResponder } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToHistory } from "../../store/drinkHistory";
import { drinkTypeList } from "../../utils/maps";
import * as Haptics from "expo-haptics";

import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { PrimaryText } from "../../components/texts/PrimaryText";
import { QuantityInputBottle } from "./QuantityInputBottle";
import { BackButton } from "../../components/buttons/BackButton";

import { inputDrinkConfig } from "../../utils/constants";
import SCREEN_SIZE from "../../utils/screenSize";
import { GradientWrapper } from "../../components/themes/GradientWrapper";

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

const headerTextSize = {
  SMALL: 5,
  MEDIUM: 5,
  LARGE: 9,
};

const sensitivity = {
  SMALL: 0.75,
  MEDIUM: 0.45,
  LARGE: 0.25,
};

function QuantityInputScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { drinkType } = route.params;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const inputBottleObject = inputDrinkConfig.filter(
    (item) => item.drinkType === drinkType.drinkType
  )[0];

  // Not destructuring this on purpose for better readability
  const inputBottleSize = inputBottleObject.size;
  const incrementValue = inputBottleObject.increment;
  const hydroFactor = inputBottleObject.hydroFactor;

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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const dragDistance = gestureState.dy * sensitivity[SCREEN_SIZE];

      // Calculate height of water based on drag
      const newHeight = Math.max(0, Math.min(100, heightVal - dragDistance));
      setHeightVal(newHeight);

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
      const date = new Date();
      const timeHours = date.getHours();
      const timeMins = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

      const time = `${timeHours}:${timeMins}`;

      const drinkItem = {
        ...drinkType,
        quantity: quantityValue,
        time,
        hydrationQuantity: quantityValue * hydroFactor,
      };

      dispatch(addToHistory(drinkItem));
      navigation.navigate("Home");
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
    <GradientWrapper style={[{ paddingTop: insets.top }]}>
      <View style={styles.backButton}>
        <BackButton></BackButton>
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText size={headerTextSize[SCREEN_SIZE]}>
            How much {drinkTypeLabel}?
          </PrimaryText>
        </Animated.View>
      </View>
      <View style={styles.cupWrapper} {...panResponder.panHandlers}>
        <QuantityInputBottle
          heightVal={heightVal}
          liquidColor={drinkType.color}
        ></QuantityInputBottle>
      </View>
      <View style={styles.amountDrank}>
        <PrimaryText size={headerTextSize[SCREEN_SIZE]}>
          {quantityValue} ml
        </PrimaryText>
      </View>
      <View style={styles.buttonWrapper}>
        <PrimaryButton onPress={handleContinue}>
          {"Add this amount".toUpperCase()}
        </PrimaryButton>
      </View>
    </GradientWrapper>
  );
}

export { QuantityInputScreen };

const styles = StyleSheet.create({
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
