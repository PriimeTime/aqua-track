import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState, useCallback } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";

const Stack = createNativeStackNavigator();

export default function App() {
  const [amountDrank, setAmountDrank] = useState(0);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="home">
            {(props) => (
              <HomeScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="inputDrinkAmountScreen">
            {(props) => (
              <InputDrinkAmountScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="inputDrinkTypeScreen">
            {(props) => (
              <InputDrinkTypeScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function HomeScreen({ navigation, route, amountDrank, setAmountDrank }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <InfoText amountDrank={amountDrank}></InfoText>
      <InputDrink navigation={navigation} setAmountDrank={setAmountDrank} />
      <Statistics />
      <StatusBar style="auto" />
    </View>
  );
}

const milliliterOptions = Array.from({ length: 50 }, (_, index) => {
  return {
    label: index === 0 ? "-" : `${(index + 1) * 10} ml`,
    value: index === 0 ? 0 : (index + 1) * 10,
  };
});

function InputDrinkAmountScreen({ navigation, amountDrank, setAmountDrank }) {
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
      navigation.navigate("inputDrinkTypeScreen");
      setPickerValue(10);
    }
  };

  return (
    <View style={[/*styles.container,*/ { paddingTop: insets.top }]}>
      <View style={styles.inputDrinkAmountScreen.header}>
        <Text style={styles.inputDrinkAmountScreen.header.text}>
          How much did you drink?
        </Text>
      </View>
      <Picker
        style={styles.inputDrinkAmountScreen.picker}
        selectedValue={pickerValue}
        onValueChange={(itemValue, itemIndex) => {
          setPickerValue(itemValue);
          setHasPickerValueChanged(true);
        }}
      >
        {milliliterOptions.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      <View style={styles.inputDrinkAmountScreen.bottle}>
        <Text>placeholder for image, filling up a bottle as you scroll</Text>
      </View>
      <View style={styles.inputDrinkAmountScreen.buttonWrapper}>
        <Pressable
          style={styles.inputDrinkAmountScreen.buttonWrapper.button}
          onPress={handleContinue}
        >
          <Text style={styles.inputDrinkAmountScreen.buttonWrapper.button.text}>
            Continue
          </Text>
        </Pressable>
      </View>
      {/* <Text>
        What did you drink? I know you drank {route.params.glassType.size}ml of
        something
      </Text> */}
    </View>
  );
}

function InputDrinkTypeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: insets.top }]}>
      <View style={styles.InputDrinkTypeScreen.header}>
        <Text style={styles.InputDrinkTypeScreen.header.text}>
          What did you drink?
        </Text>
      </View>
      <View style={styles.InputDrinkTypeScreen.drinkTypeSelectionWrapper}>
        <Text>placeholder for drink selection</Text>
      </View>
      <View style={styles.InputDrinkTypeScreen.footer}>
        <Pressable
          style={styles.InputDrinkTypeScreen.footer.button}
          onPress={() => navigation.navigate("home")}
        >
          <Text style={styles.InputDrinkTypeScreen.footer.button.text}>
            Yep, that's what I drank
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function InfoText({ amountDrank }) {
  return (
    <View style={styles.infoText}>
      <Text>You drank {amountDrank} ml of liquid today!</Text>
    </View>
  );
}

function InputDrink({ setAmountDrank, navigation }) {
  return (
    <>
      <View style={styles.addDrinkButtonWrapper}>
        <TouchableOpacity
          style={styles.addDrinkButtonWrapper.addDrinkButton}
          onPress={() => navigation.navigate("inputDrinkAmountScreen")}
        >
          <Image
            style={styles.addDrinkButtonWrapper.addDrinkButton.image}
            source={require("./assets/icons/waterbottle.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

function Statistics() {
  return (
    <>
      <View style={styles.statistics}>
        <Text>placeholder text</Text>
        {/* TODO: should be a bar with statistics */}
      </View>
    </>
  );
}

function addDrink(setAmountDrank, currentAmount, additionalAmount) {
  setAmountDrank(currentAmount + Number(additionalAmount)); // convert picker value to a number
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1, // <-- fills the screen, equivalent to height 100%
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },
  inputDrinkAmountScreen: {
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
  },
  InputDrinkTypeScreen: {
    header: {
      width: "100%",
      height: "25%",
      justifyContent: "center",
      alignItems: "center",
      text: {
        fontSize: 35,
        fontWeight: 300,
      },
    },
    drinkTypeSelectionWrapper: {
      width: "100%",
      height: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      width: "100%",
      height: "25%",
      justifyContent: "center",
      alignItems: "center",
      button: {
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: "#007AFF", // default apple button blue color code
        text: {
          textAlign: "center",
          fontSize: 25,
          lineHeight: 30,
          fontWeight: 400,
          letterSpacing: 5,
          color: "white",
        },
      },
    },
  },
  addDrinkButtonWrapper: {
    width: "100%",
    height: "30%",
    addDrinkButton: {
      justifyContent: "center",
      alignItems: "center",
      image: {
        height: "100%",
        width: "100%",
      },
    },
  },
  plusSign: {
    fontSize: 24, // Size of the plus sign
    fontWeight: "bold", // Bold the plus sign
  },
  infoText: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    marginLeft: 20,
    marginRight: 20,
  },
  statistics: {
    width: "100%",
    height: "45%",
    alignItems: "center", // Center horizontally
    justifyContent: "center",
  },
});
