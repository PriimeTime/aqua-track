import { View, Text, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const milliliterOptions = Array.from({ length: 50 }, (_, index) => {
  return {
    label: index === 0 ? "-" : `${(index + 1) * 10} ml`,
    value: index === 0 ? 0 : (index + 1) * 10,
  };
});

function addDrink(setAmountDrank, currentAmount, additionalAmount) {
  setAmountDrank(currentAmount + Number(additionalAmount)); // convert picker value to a number
}

function QuantityInputScreen({ navigation, amountDrank, setAmountDrank }) {
  const insets = useSafeAreaInsets();
  const [pickerValue, setPickerValue] = useState(10);
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
      addDrink(setAmountDrank, amountDrank, pickerValue);
      navigation.navigate("typeInputScreen");
      setPickerValue(10);
    }
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text style={styles.header.text}>How much did you drink?</Text>
      </View>

      <Picker
        style={styles.picker}
        selectedValue={pickerValue}
        onValueChange={(itemValue) => {
          setPickerValue(itemValue);
          setHasPickerValueChanged(true);
        }}
      >
        {milliliterOptions.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <View style={styles.bottle}>
        <Text>placeholder for image, filling up a bottle as you scroll</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Pressable style={styles.buttonWrapper.button} onPress={handleContinue}>
          <Text style={styles.buttonWrapper.button.text}>Continue</Text>
        </Pressable>
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
    text: {
      fontSize: 35,
      fontWeight: 300,
    },
  },
  picker: {
    height: "25%",
    width: "100%",
  },
  bottle: {
    justifyContent: "center",
    alignItems: "center",
    height: "35%",
    width: "100%",
  },
  buttonWrapper: {
    height: "15%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    button: {
      paddingVertical: 20,
      paddingHorizontal: 60,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: "#007AFF", // default apple button blue color code
      text: {
        fontSize: 25,
        lineHeight: 30,
        fontWeight: 400,
        letterSpacing: 5,
        color: "white",
      },
    },
  },
});
