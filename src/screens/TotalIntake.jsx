import { useSelector } from "react-redux";
import { PrimaryText } from "../components/texts/PrimaryText";
import { StyleSheet, View } from "react-native";
import { color, shadow } from "../utils/themes";

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

function TotalIntake() {
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const totalDrinkQuantity = drinkHistory.reduce(
    (acc, val) => acc + val.quantity,
    0
  );

  return (
    <View style={styles.wrapper}>
      <PrimaryText size={3} color={color.SECONDARY_TEXT}>
        {metricUnitConversion(totalDrinkQuantity)}
      </PrimaryText>
    </View>
  );
}

export { TotalIntake };

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red",
    paddingHorizontal: 27.5,
    paddingVertical: 12.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    color: color.SECONDARY_TEXT,
    backgroundColor: color.SECONDARY_BUTTON,
    ...shadow.shadow,
  },
});
