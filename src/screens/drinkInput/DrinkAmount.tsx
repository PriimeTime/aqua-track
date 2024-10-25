import { View, StyleSheet, Animated, PanResponder } from "react-native";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  RouteProp,
  ParamListBase,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

import { inputDrinkConfig } from "@/utils/constants";
import { animatedScaleValue } from "@/utils/animations";
import { drinkAmountSensitivity } from "@/utils/constants/components/drinks";
import { headerFontSize } from "@/utils/constants/components/typography";

import { PrimaryButton, BackButton } from "@/components/buttons";
import { PrimaryText } from "@/components/texts";
import { GradientWrapper } from "@/components/wrappers";

import { DrinkAmountBottle } from "@/screens/drinkInput/DrinkAmountBottle";

import { DrinkItem } from "@/models/DrinkItem";

import { MainRouteName } from "@/enums/routes/MainRouteName";

import { useDrinkManager, useDisplayUnits } from "@/hooks";

/**
 * Debounce function to control
 * haptic feedback intensity
 */
const useDebouncedCallback = (callback: () => void, delay: number) => {
  const lastCall = useRef(0);

  return () => {
    const now = new Date().getTime();
    if (now - lastCall.current > delay) {
      lastCall.current = now;
      callback();
    }
  };
};

function DrinkAmount() {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route =
    useRoute<RouteProp<{ params: { drinkType: DrinkItem } }, "params">>();

  const { drinkType } = route.params;
  const scaleValue = useRef(animatedScaleValue(1)).current;

  const { displayVolumeWithUnit } = useDisplayUnits();

  const inputBottleObject = inputDrinkConfig.filter(
    (item) => item.drinkType === drinkType.drinkType
  )[0];

  const inputBottleSize = inputBottleObject?.size ?? 0;
  const incrementValue = inputBottleObject?.increment ?? 0;

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

  const [addDrink] = useDrinkManager();

  useEffect(() => {
    debouncedHapticFeedback();
  }, [quantityValue]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const dragDistance = gestureState.dy * drinkAmountSensitivity;

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
    /** Only let user save the drink if they gave a quantity greater than 0
     * otherwise trigger an animation
     */
    if ((hasQuantityValueChanged && quantityValue !== 0) || quantityValue > 0) {
      addDrink(drinkType, quantityValue);
      navigation.navigate(MainRouteName.Home);
    } else {
      triggerAnimation();
    }
  };

  return (
    <GradientWrapper style={styles.wrapper}>
      <View style={styles.backButton}>
        <BackButton></BackButton>
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText numberOfLines={1} fontSize={headerFontSize}>
            {`${t("drinks.quantityPrompt")}`}
          </PrimaryText>
        </Animated.View>
      </View>
      <View style={styles.cupWrapper} {...panResponder.panHandlers}>
        <DrinkAmountBottle
          heightVal={heightVal}
          liquidColor={drinkType.color}
        ></DrinkAmountBottle>
      </View>
      <View style={styles.amountDrank}>
        <PrimaryText numberOfLines={1} fontSize={headerFontSize}>
          {displayVolumeWithUnit(quantityValue)}
        </PrimaryText>
      </View>
      <View style={styles.buttonWrapper}>
        <PrimaryButton onPress={handleContinue}>
          {t("button.continue").toUpperCase()}
        </PrimaryButton>
      </View>
    </GradientWrapper>
  );
}

export { DrinkAmount };

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    height: "5%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  cupWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
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
