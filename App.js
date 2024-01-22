import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import { useState } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";

const Root = createNativeStackNavigator();

export default function App() {
  const [amountDrank, setAmountDrank] = useState(0);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root.Navigator
          screenOptions={{
            headerShown: false, //true,
            // headerTitle: "",
          }}
        >
          <Root.Screen name="home">
            {(props) => (
              <HomeScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Root.Screen>
          <Root.Screen name="inputDrinkAmountScreen">
            {(props) => (
              <InputDrinkAmountScreen
                {...props}
                amountDrank={amountDrank}
                setAmountDrank={setAmountDrank}
              />
            )}
          </Root.Screen>
        </Root.Navigator>
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

const milliliterOptions = Array.from({ length: 75 }, (_, index) => {
  return { label: `${(index + 1) * 10} ml`, value: (index + 1) * 10 };
});

function InputDrinkAmountScreen({
  navigation,
  route,
  amountDrank,
  setAmountDrank,
}) {
  const insets = useSafeAreaInsets();
  const [volumeDrank, setVolumeDrank] = useState();

  return (
    <View style={[/*styles.container,*/ { paddingTop: insets.top }]}>
      <View style={styles.inputDrinkAmountScreen.header}>
        <Text style={styles.inputDrinkAmountScreen.header.text}>
          How much did you drink?
        </Text>
      </View>
      <Picker
        style={styles.inputDrinkAmountScreen.picker}
        selectedValue={amountDrank}
        onValueChange={(itemValue, itemIndex) => setVolumeDrank(itemValue)}
      >
        {milliliterOptions.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      <View style={styles.inputDrinkAmountScreen.bottle}>
        <Text>placeholder for image, filling up a bottle as you scroll</Text>
      </View>
      {/* <Text>
        What did you drink? I know you drank {route.params.glassType.size}ml of
        something
      </Text> */}
    </View>
  );
}

function InfoText({ amountDrank }) {
  return (
    <View style={styles.infoText}>
      <Text>You drank {amountDrank} liters of liquid today!</Text>
    </View>
  );
}

function InputDrink({ setAmountDrank, navigation }) {
  return (
    <>
      {/* <Button
          style={styles.addDrinkButton}
          title="+"
          onPress={() => navigation.navigate("inputDrinkAmountScreen")}
        /> */}
      <TouchableOpacity
        style={styles.addDrinkButtonWrapper}
        onPress={() => navigation.navigate("inputDrinkAmountScreen")}
      >
        <Image
          style={styles.addDrinkButton}
          source={require("./assets/icons/waterbottle.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
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

function addDrink(amountDrank, setAmountDrank) {
  setAmountDrank(amountDrank + 1);
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
      height: "50%",
      width: "100%",
    },
  },
  addDrinkButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  addDrinkButton: {
    height: "50%",
    width: "50%",
  },
  plusSign: {
    fontSize: 24, // Size of the plus sign
    fontWeight: "bold", // Bold the plus sign
  },
  infoText: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    marginLeft: 20,
    marginRight: 20,
  },
  statistics: {
    width: "100%",
    flex: 1,
    alignItems: "center", // Center horizontally
    justifyContent: "center",
  },
});
