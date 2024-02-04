import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { PrimaryText } from "../components/texts/PrimaryText";

const metricUnitConversion = (totalIntake) => {
  let retVal = `${totalIntake} ml`;

  if (totalIntake > 500 && totalIntake < 1000) {
    retVal = `${Math.round(totalIntake / 100)} dl`;
  } else if (totalIntake >= 1000 && totalIntake < 5000) {
    retVal = `${(totalIntake / 1000).toFixed(1)} l`;
  } else if (totalIntake > 5000) {
    retVal = `${Math.round(totalIntake / 1000)} l`;
  }

  return retVal;
};

function MainHeader() {
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const totalDrinkQuantity = drinkHistory.reduce(
    (acc, val) => acc + val.quantity,
    0
  );

  function getHeaderText() {
    if (totalDrinkQuantity === 0) {
      return `Time to hydrate yourself!`;
    } else {
      return `Your intake today`;
    }
  }

  return (
    <View style={styles.wrapper}>
      <PrimaryText size={3}>{getHeaderText()}</PrimaryText>
      {/* TODO: make below unit into a card just like in the figma mock-up */}
      <PrimaryText size={3}>
        {metricUnitConversion(totalDrinkQuantity)}
      </PrimaryText>
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
