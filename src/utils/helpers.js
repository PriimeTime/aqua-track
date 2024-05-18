/**
 * @param {*} obj
 * @returns a boolean
 * that determines if the
 * given object is empty or not
 * based on whether it has nested
 * properties and if it has, it also
 * checks if they are empty
 */
function isEmptyObject(obj) {
  // Check if the object itself has no properties
  if (Object.keys(obj).length === 0) return true;

  // Iterate over properties and check for emptiness
  return Object.keys(obj).every((key) => {
    const value = obj[key];
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object" && value !== null)
      return isEmptyObject(value);
    return false;
  });
}

/**
 * @param {*} num
 * @returns a promise that
 * will resolve in the given
 * time
 */
const sleep = (timeMs) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
};

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

/**
 *
 * @param {*} unixTime
 * @returns a string with
 * hours and minutes pulled from the
 * unixTime param, in the following format:
 * hh:mm
 */
const getHoursMinutesFromUnixDate = (unixTime) => {
  const date = new Date(unixTime);

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure minutes are two digits

  const timeString = `${hours}:${minutes}`;

  return timeString;
};

export {
  isEmptyObject,
  sleep,
  metricUnitConversion,
  totalDrinkQuantity,
  totalHydratingDrinkQuantity,
  displayPositivePercent,
  getHoursMinutesFromUnixDate,
};
