import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { PrimaryText } from "../components/texts/PrimaryText";

const metricUnitConversion = (waterIntake) => {
  let retVal = `${waterIntake} ml`;

  if (waterIntake > 500 && waterIntake < 1000) {
    retVal = `${Math.round(waterIntake / 100)} dl`;
  } else if (waterIntake >= 1000 && waterIntake < 5000) {
    retVal = `${(waterIntake / 1000).toFixed(1)} l`;
  } else if (waterIntake > 5000) {
    retVal = `${Math.round(waterIntake / 1000)} l`;
  }

  return retVal;
};

function MainHeader() {
  const waterIntake = useSelector((state) => state.waterIntake.value);

  function getHeaderText() {
    if (waterIntake === 0) {
      return `Time to hydrate yourself!`;
    } else {
      return `Your intake today`;
    }
  }

  return (
    <View style={styles.wrapper}>
      <PrimaryText size={3}>{getHeaderText()}</PrimaryText>
      {/* TODO: make below unit into a card just like in the figma mock-up */}
      <PrimaryText size={3}>{metricUnitConversion(waterIntake)}</PrimaryText>
    </View>
  );
}

export { MainHeader };

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    left: "5%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
