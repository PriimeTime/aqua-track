import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import appleHealthKit, { HealthValueOptions } from "react-native-health";

import { addToHistory, removeFromHistory } from "@/store/drinkHistory";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";
import { DrinkItem } from "@/models/DrinkItem";

import { type UID } from "@/types/UID";
import { type UserDataState } from "@/types/store/UserDataState";
import { type GeneralState } from "@/types/store/GeneralState";

import {
  addDrinkToUserHistory,
  removeDrinkFromUserHistory,
} from "@/utils/database";
import { inputDrinkConfig, ONE_THOUSAND } from "@/utils/constants";

import { DrinkType } from "@/enums/maps/DrinkType";

type UseDrinkManagerReturn = [
  (drinkType: DrinkItem, quantityValue: number) => void,
  (item: DrinkHistoryItem) => void
];

/**
 * Custom hook to manage drink history.
 *
 * This hook provides two functions:
 * 1. addDrink: Adds a drink item to the history.
 * 2. removeDrink: Removes a drink item from the history.
 *
 * The addDrink function computes additional properties such as hydration quantity
 * and alcohol by volume (ABV) based on the drink type and quantity, then dispatches
 * the action to add the drink to the history store and updates the database if the
 * user is authenticated.
 *
 * The removeDrink function schedules the removal of a drink item from the history
 * store and updates the database if the user is authenticated.
 *
 * @returns an array containing the addDrink and removeDrink functions
 */
function useDrinkManager(): UseDrinkManagerReturn {
  const dispatch = useDispatch();

  const isInternetReachable = useSelector(
    (state: GeneralState) => state.general.networkStatus.isReachable
  );
  const userUID = useSelector(
    (state: UserDataState) => state.userData.userAuth.uid
  );

  /**
   * @param drinkType - type of drink to be added to the history
   * @param quantityValue - quantity of drink to be added to the history in milliliters (ml)
   */
  const addDrink = async (drinkType: DrinkItem, quantityValue: number) => {
    const inputBottleObject = inputDrinkConfig.filter(
      (item) => item.drinkType === drinkType.drinkType
    )[0];

    const hydroFactor = inputBottleObject?.hydroFactor ?? 0;
    const abv = inputBottleObject?.abv ?? 0;

    const date = Date.now();
    const id: UID = uid(8);

    const drinkItem: DrinkHistoryItem = {
      ...drinkType,
      quantity: quantityValue,
      date,
      hydrationQuantity: quantityValue * hydroFactor,
      abv,
      id,
    };

    if (drinkType.drinkType === DrinkType.Normal) {
      const options: HealthValueOptions = {
        value: quantityValue / ONE_THOUSAND,
        unit: appleHealthKit.Constants.Units.gram,
        startDate: new Date(date).toISOString(),
      };

      appleHealthKit.saveWater(options, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Water data saved successfully!");
        }
      });
    }
    dispatch(addToHistory(drinkItem));
    if (userUID) {
      await addDrinkToUserHistory(userUID, drinkItem, isInternetReachable);
    }
  };

  /**
   * @param item - The DrinkHistoryItem to be removed. The object must exactly match
   * the entry in the database for successful removal from Firestore.
   */
  const removeDrink = (item: DrinkHistoryItem) => {
    setTimeout(async () => {
      dispatch(removeFromHistory(item.id));
      if (userUID) {
        await removeDrinkFromUserHistory(userUID, item, isInternetReachable);
      }
    }, 150);
  };

  return [addDrink, removeDrink];
}

export { useDrinkManager };
