import { View, StyleSheet, Animated, PanResponder } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { increment, addToHistory } from "../../../store/store";
import { drinkTypeList } from "../../../utils/maps";
import * as Haptics from "expo-haptics";

import { PrimaryButton } from "../../themes/button/PrimaryButton";
import { PrimaryText } from "../../themes/text/PrimaryText";
import { QuantityInputBottle } from "./QuantityInputBottle";
import { color } from "../../../utils/themes";

import {
  inputBottleSizeInMilliliters,
  incrementValue,
} from "../../../utils/constants";

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

function QuantityInputScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const drinkType = useSelector((state) => state.drinkType.value);

  const scaleValue = useState(new Animated.Value(1))[0];

  const debouncedHapticFeedback = useDebouncedCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, 25);

  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
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
      dispatch(increment(Number(quantityValue)));
      dispatch(addToHistory({ ...drinkType, quantity: quantityValue }));
      navigation.navigate("home");
    } else {
      triggerAnimation();
    }
  };

  const drinkTypeObject = drinkTypeList.find(
    (item) => item.id === drinkType.id
  );
  const drinkTypeLabel = drinkTypeObject
    ? drinkTypeObject.label.toLowerCase() + " "
    : "";

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText size={1}>
            How much {drinkTypeLabel}did you drink?
          </PrimaryText>
        </Animated.View>
      </View>

      <View style={styles.amountDrank}>
        <PrimaryText size={3}>{quantityValue} ml</PrimaryText>
      </View>

      <View style={styles.cupWrapper} {...panResponder.panHandlers}>
        <QuantityInputBottle
          heightVal={heightVal}
          liquidColor={drinkType.color}
        ></QuantityInputBottle>
      </View>

      <View style={styles.buttonWrapper}>
        <PrimaryButton onPress={handleContinue}>Continue</PrimaryButton>
      </View>
    </View>
  );
}

export { QuantityInputScreen };

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
  },
  header: {
    height: "20%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  amountDrank: {
    height: "20%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  cupWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "45%",
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
