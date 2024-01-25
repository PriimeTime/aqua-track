import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { increment } from "../../../store/store.js";

import { PrimaryButton } from "../../themes/button/PrimaryButton";
import { PrimaryText } from "../../themes/text/PrimaryText";

const milliliterOptions = Array.from({ length: 50 }, (_, index) => {
  return {
    label: index === 0 ? "-" : `${(index + 1) * 10} ml`,
    value: index === 0 ? 0 : (index + 1) * 10,
  };
});

function QuantityInputScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [pickerValue, setPickerValue] = useState(10);
  const [heightVal, setHeightVal] = useState(0);

  const [hasPickerValueChanged, setHasPickerValueChanged] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset the hasPickerValueChanged to false when screen is focused
      setHasPickerValueChanged(false);

      return () => {
        // Optional: Any cleanup actions go here
      };
    }, [])
  );

  const handleContinue = () => {
    if (hasPickerValueChanged && pickerValue !== 0) {
      dispatch(increment(Number(pickerValue)));
      navigation.navigate("typeInputScreen");
      setPickerValue(10);
    }
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={styles.header}>
        <PrimaryText size={1}>How much did you drink?</PrimaryText>
      </View>

      <Picker
        style={styles.picker}
        selectedValue={pickerValue}
        onValueChange={(itemValue) => {
          setPickerValue(itemValue);
          setHasPickerValueChanged(true);
          setHeightVal(
            (Number(itemValue) /
              milliliterOptions[milliliterOptions.length - 1].value) *
              100
          );
        }}
      >
        {milliliterOptions.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <View style={styles.cupWrapper}>
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
    height: "25%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: "25%",
    width: "100%",
  },
  cupWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "35%",
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
