/**
 *
 * @param {*} num
 * @returns rounded number
 * if retVal would be negative,
 * it returns zero
 */

const formatNumber = (num) => {
  const roundedNumber = Math.round(num);
  return Math.max(0, roundedNumber);
};

/**
 *
 * @param {*} num
 * @param {*} denom
 * @returns positive percent of num/denom
 */
const displayPositivePercent = (num, denom) => {
  return formatNumber((num / denom) * 100);
};

/**
 *
 * @param {*} totalIntake
 * @returns string depicting formatted beverage quantity in metric units
 */
const metricUnitConversion = (totalIntake) => {
  let retVal = `${totalIntake} ml`;

  if (totalIntake > 500 && totalIntake < 1000) {
    retVal = `${formatNumber(totalIntake / 100)} dl`;
  } else if (totalIntake >= 1000 && totalIntake < 5000) {
    retVal = `${formatNumber((totalIntake / 1000).toFixed(1))} l`;
  } else if (totalIntake > 5000) {
    retVal = `${formatNumber(totalIntake / 1000)} l`;
  }

  return retVal;
};

/**
 *
 * @param {*} drinkHistory
 * @returns total quantity of consumed beverages
 */
const totalDrinkQuantity = (drinkHistory) => {
  return drinkHistory.reduce((acc, val) => acc + val.quantity, 0);
};

/**
 *
 * @param {*} drinkHistory
 * @returns net hydration quantity of beverages, to water-equivalent values
 *
 * Meaning Drinking 500ml of water returns 500ml water
 * Drinking 500ml of beer returns -80ml
 * Drinking 250ml of tea returns 225ml, etc.
 */
const totalHydratingDrinkQuantity = (drinkHistory) => {
  return drinkHistory.reduce((acc, val) => acc + val.hydrationQuantity, 0);
};

export {
  metricUnitConversion,
  totalDrinkQuantity,
  totalHydratingDrinkQuantity,
  displayPositivePercent,
};
