import { View, StyleSheet, Animated, PanResponder } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../../store/store.js";
import { drinkTypeList } from "../../../utils/maps.js";

import { PrimaryButton } from "../../themes/button/PrimaryButton";
import { PrimaryText } from "../../themes/text/PrimaryText";

import {
  inputBottleSizeInMilliliters,
  incrementValue,
} from "../../../utils/constants";

function QuantityInputScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const drinkType = useSelector((state) => state.drinkType.value);

  const scaleValue = useState(new Animated.Value(1))[0];

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

  const scaleFactor = 0.55; // Adjust this value as needed for sensitivity

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const dragDistance = gestureState.dy * scaleFactor;

      // Calculate the height of the water based on the drag
      const newHeight = Math.max(0, Math.min(100, heightVal - dragDistance));
      setHeightVal(newHeight);

      const bottleSize =
        (Math.round(newHeight) * inputBottleSizeInMilliliters) / 100;
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
    if (hasQuantityValueChanged && quantityValue !== 0) {
      dispatch(increment(Number(quantityValue)));
      navigation.navigate("home");
      setQuantityValue(10);
    } else {
      triggerAnimation();
    }
  };

  const drinkTypeObject = drinkTypeList.find((item) => item.id === drinkType);
  const drinkTypeLabel = drinkTypeObject
    ? drinkTypeObject.label.toLowerCase() + " "
    : "";

  return (
    <View style={{ paddingTop: insets.top }}>
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
        <View style={styles.cupWrapper.cup}>
          <View
            style={[
              styles.cupWrapper.cup.water,
              { height: `${(heightVal / 100) * 80}%` },
            ]}
          ></View>
          <View style={styles.cupWrapper.cup.light}></View>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <PrimaryButton onPress={handleContinue}>Continue</PrimaryButton>
      </View>
    </View>
  );
}

export { QuantityInputScreen };

const styles = StyleSheet.create({
  header: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  amountDrank: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cupWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "45%",
    width: "100%",
    cup: {
      top: 10,
      position: "absolute",
      width: 150,
      height: 250,
      backgroundColor: "#189acf", // TODO: make this gradient
      borderRadius: 2,
      transform: [{ perspective: 10 }, { rotateX: "-1deg" }],
      margin: 50,
      water: {
        position: "absolute",
        bottom: "5%",
        left: "10%",
        width: "80%",
        backgroundColor: "#0152BF", // TODO: make this gradient
        borderRadius: "3px 3px 30px 30px", // TODO: does not work yet
      },
      light: {
        position: "absolute",
        left: "20%",
        bottom: "20%",
        zIndex: 1,
        width: "15%",
        height: "75%",
        borderRadius: "0% 100% 100% 0% / 100% 0% 100% 0%", // TODO: does not work yet
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transform: [{ scaleX: -1 }],
      },
    },
  },
  buttonWrapper: {
    height: "15%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
