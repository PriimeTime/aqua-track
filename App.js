import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function App() {
  // TODO IMPORTANT: do sth about dynamic island / notch / standard screens!!!
  const [amountDrank, setAmountDrank] = useState(0);

  return (
    <View style={styles.container}>
      <InfoText amountDrank={amountDrank}></InfoText>
      <InputDrink setAmountDrank={setAmountDrank} />
      <Statistics />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // <-- fills the screen, equivalent to height 100%
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },
  glassStyles: {
    width: 25,
    height: 25,
  },
  infoText: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputDrinkStyles: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

function InfoText({ amountDrank }) {
  return (
    <View style={styles.infoText}>
      <Text>You drank {amountDrank} liters of liquid today!</Text>
    </View>
  );
}

function InputDrink({ setAmountDrank }) {
  const glassTypes = [
    // { id: 1, size: 40, src: "smshotglass" },
    // { id: 2, size: 50, src: "mdshotglass" },
    // { id: 3, size: 100, src: "xlshotglass" },
    { id: 4, size: 150, src: "wineglass" },
    { id: 5, size: 300, src: "smglass" },
    { id: 6, size: 400, src: "mdglass" },
    { id: 7, size: 500, src: "xlglass" },
    // { id: 8, size: 700, src: "xxlglass" },
  ];

  const listGlasses = glassTypes.map((glass) => (
    <li key={glass.id}>
      <Image style={styles.glassStyles} source={glassImages[glass.src]}></Image>
    </li>
  ));

  return (
    <>
      <View style={styles.inputDrinkStyles}>
        <ScrollView
          bounces={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {glassTypes.map((glass) => (
            <View key={glass.id} style={styles.listItem}>
              <TouchableOpacity
                onPress={() => Alert.alert(`img w/ id:${glass.id} pressed!`)}
              >
                <Image
                  style={styles.glassStyles}
                  source={glassImages[glass.src]}
                />
              </TouchableOpacity>
            </View>
          ))}
          {/* <Button title="Add drink" onPress={() => addDrink(amountDrank, setAmountDrank)} /> */}
        </ScrollView>
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

function addDrink(amountDrank, setAmountDrank) {
  setAmountDrank(amountDrank + 1);
}

const glassImages = {
  // smshotglass: require('@assets/glass_types/smshotglass.png'),
  // mdshotglass: require('@assets/glass_types/mdshotglass.png'),
  // xlshotglass: require('@assets/glass_types/xlshotglass.png'),
  wineglass: require("./assets/glass_types/wineglass.png"),
  smglass: require("./assets/glass_types/smglass.png"),
  mdglass: require("./assets/glass_types/mdglass.png"),
  xlglass: require("./assets/glass_types/xlglass.png"),
  // xxlglass: require('@assets/glass_types/xxlglass.png'),
};
