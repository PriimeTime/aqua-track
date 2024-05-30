import { DrinkHistory } from "@/models/DrinkHistory";

/**
 * @param {*} obj - the object to check
 * @returns a boolean indicating if the object
 * (and its nested properties) is empty
 */
function isEmptyObject(obj: any): boolean {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj))
    return false;
  if (Object.keys(obj).length === 0) return true;

  return Object.keys(obj).every((key) => {
    const value = obj[key];
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object" && value !== null)
      return isEmptyObject(value);
    return false;
  });
}

/**
 * @param {*} timeMs - time in milliseconds to wait
 * @returns a promise that resolves in the given time
 */
const sleep = (timeMs: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
};

/**
 *
 * @param {*} num - the number to format
 * @returns the rounded number or zero if the result would be negative
 */

const formatNumber = (num: number): number => {
  const roundedNumber = Math.round(num);
  return Math.max(0, roundedNumber);
};

/**
 *
 * @param {*} num - the numerator
 * @param {*} denom - the denominator
 * @returns the positive percentage
 */
const displayPositivePercent = (num: number, denom: number): number => {
  return formatNumber((num / denom) * 100);
};

/**
 *
 * @param {*} num - the number to format
 * @param {*} decimals - the number of decimal places
 * @returns the formatted number
 */
const formatDecimals = (num: number, decimals: number): number => {
  const fixedNum: string = num.toFixed(decimals);
  const parsedNum: number = parseFloat(fixedNum);

  return parsedNum;
};

/**
 *
 * @param {*} totalIntake - the total intake in milliliters
 * @returns a string depicting formatted beverage quantity in metric units
 */
const metricUnitConversion = (totalIntake: number): string => {
  let retVal = `${totalIntake} ml`;

  if (totalIntake > 500 && totalIntake < 1000) {
    retVal = `${formatNumber(totalIntake / 100)} dl`;
  } else if (totalIntake >= 1000 && totalIntake < 5000) {
    retVal = `${formatNumber(formatDecimals(totalIntake, 1) / 1000)} l`;
  } else if (totalIntake > 5000) {
    retVal = `${formatNumber(totalIntake / 1000)} l`;
  }

  return retVal;
};

/**
 *
 * @param {*} drinkHistory - array of drink history records
 * @returns the total quantity of consumed beverages
 */
const totalDrinkQuantity = (drinkHistory: DrinkHistory[]) => {
  return drinkHistory.reduce((acc, val) => acc + val.quantity, 0);
};

/**
 *
 * @param {*} drinkHistory - array of drink history records
 * @returns the net hydration quantity
 *
 * Meaning Drinking 500ml of water returns 500ml water
 * Drinking 500ml of beer returns -80ml
 * Drinking 250ml of tea returns 225ml, etc.
 */
const totalHydratingDrinkQuantity = (drinkHistory: DrinkHistory[]) => {
  return drinkHistory.reduce((acc, val) => acc + val.hydrationQuantity, 0);
};

/**
 *
 * @param {*} unixTime - the unix timestamp
 * @returns a string with the hours and minutes
 * in the following format: hh:mm
 */
const getHoursMinutesFromUnixDate = (unixTime: number): string => {
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
  formatDecimals,
};
