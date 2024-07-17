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
import { useDispatch, useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import { uid } from "uid";

import { addToHistory } from "@/store/drinkHistory";

import { drinkTypeList } from "@/utils/maps";
import { inputDrinkConfig } from "@/utils/constants";
import { animatedScaleValue } from "@/utils/animations";
import {
  drinkAmountFontSize,
  drinkAmountSensitivity,
} from "@/utils/constants/components/drinks";
import { calculateBacAfterDrink } from "@/utils/helpers";
import { addDrinkToUserHistory } from "@/utils/database";

import { PrimaryButton, BackButton } from "@/components/buttons";
import { PrimaryText } from "@/components/texts";
import { GradientWrapper } from "@/components/wrappers";

import { DrinkAmountBottle } from "@/screens/drinkInput/DrinkAmountBottle";

import { DrinkItem } from "@/models/DrinkItem";

import { MainRouteName } from "@/enums/routes/MainRouteName";

import { type UserDataState } from "@/types/store/UserDataState";
import { type UID } from "@/types/UID";
import { type GeneralState } from "@/types/store/GeneralState";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

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
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route =
    useRoute<RouteProp<{ params: { drinkType: DrinkItem } }, "params">>();
  const dispatch = useDispatch();

  const isInternetReachable = useSelector(
    (state: GeneralState) => state.general.networkStatus.isReachable
  );

  const { gender, weight } = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );

  const userUID = useSelector(
    (state: UserDataState) => state.userData.userAuth.uid
  );

  const { drinkType } = route.params;
  const scaleValue = useRef(animatedScaleValue(1)).current;

  const inputBottleObject = inputDrinkConfig.filter(
    (item) => item.drinkType === drinkType.drinkType
  )[0];

  const inputBottleSize = inputBottleObject?.size ?? 0;
  const incrementValue = inputBottleObject?.increment ?? 0;
  const hydroFactor = inputBottleObject?.hydroFactor ?? 0;
  const abv = inputBottleObject?.abv ?? 0;

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

  const handleContinue = async () => {
    if ((hasQuantityValueChanged && quantityValue !== 0) || quantityValue > 0) {
      const date = Date.now();
      // TODO: below calc should be done in helpers.ts instead
      const bacAfterDrink = calculateBacAfterDrink(
        quantityValue,
        abv,
        gender,
        weight
      );

      const id: UID = uid(8);

      const drinkItem: DrinkHistoryItem = {
        ...drinkType,
        quantity: quantityValue,
        date,
        hydrationQuantity: quantityValue * hydroFactor,
        abv,
        bac: bacAfterDrink,
        id,
      };

      dispatch(addToHistory(drinkItem));
      if (userUID) {
        await addDrinkToUserHistory(userUID, drinkItem, isInternetReachable);
      }
      navigation.navigate(MainRouteName.Home);
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
    <GradientWrapper style={styles.wrapper}>
      <View style={styles.backButton}>
        <BackButton></BackButton>
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText fontSize={drinkAmountFontSize}>
            How much {drinkTypeLabel}?
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
        <PrimaryText fontSize={drinkAmountFontSize}>
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
