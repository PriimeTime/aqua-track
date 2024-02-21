import { useSelector } from "react-redux";
import { PrimaryText } from "../components/texts/PrimaryText";
import { StyleSheet, View } from "react-native";
import { color, shadow } from "../utils/themes";
import SCREEN_SIZE from "../utils/screenSize";

const cardSize = {
  SMALL: 2,
  MEDIUM: 3,
  LARGE: 4,
};

const cardPaddingHorizontal = {
  SMALL: 20,
  MEDIUM: 27.5,
  LARGE: 30,
};

const cardPaddingVertical = {
  SMALL: 10,
  MEDIUM: 12.5,
  LARGE: 15,
};

const cardBorderRadius = {
  SMALL: 30,
  MEDIUM: 36,
  LARGE: 72,
};

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
      <PrimaryText size={cardSize[SCREEN_SIZE]} color={color.SECONDARY_TEXT}>
        {metricUnitConversion(totalDrinkQuantity)}
      </PrimaryText>
    </View>
  );
}

export { TotalIntake };

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: cardPaddingHorizontal[SCREEN_SIZE],
    paddingVertical: cardPaddingVertical[SCREEN_SIZE],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: cardBorderRadius[SCREEN_SIZE],
    color: color.SECONDARY_TEXT,
    backgroundColor: color.SECONDARY_BUTTON,
    ...shadow,
  },
});
