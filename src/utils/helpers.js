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

const totalDrinkQuantity = (drinkHistory) => {
  return drinkHistory.reduce((acc, val) => acc + val.quantity, 0);
};

export { metricUnitConversion, totalDrinkQuantity };
