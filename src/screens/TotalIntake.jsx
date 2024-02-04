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

function TotalIntake() {
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const totalDrinkQuantity = drinkHistory.reduce(
    (acc, val) => acc + val.quantity,
    0
  );

  return (
    <PrimaryText size={3}>
      {metricUnitConversion(totalDrinkQuantity)}
    </PrimaryText>
  );
}

export { TotalIntake };
