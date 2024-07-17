import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";

import { addToHistory } from "@/store/drinkHistory";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";
import { DrinkItem } from "@/models/DrinkItem";

import { type UID } from "@/types/UID";
import { type UserDataState } from "@/types/store/UserDataState";
import { type GeneralState } from "@/types/store/GeneralState";

import { addDrinkToUserHistory } from "@/utils/database";
import { inputDrinkConfig } from "@/utils/constants";

/**
 * Custom hook to add a drink to the user's drink history.
 *
 * This hook provides a function, `addDrink`, that dispatches an action to add
 * a drink to the local Redux store and, if the user is logged in, it also adds
 * the drink to the user's history in the database.
 *
 * @param {*} drinkType - type of drink to be added
 * @param {*} quantityValue - quantity of the drink to be added in milliliters
 * @returns an object containing the `addDrink` function
 */
function useAddDrink(drinkType: DrinkItem, quantityValue: number) {
  const dispatch = useDispatch();

  const isInternetReachable = useSelector(
    (state: GeneralState) => state.general.networkStatus.isReachable
  );
  const userUID = useSelector(
    (state: UserDataState) => state.userData.userAuth.uid
  );

  const inputBottleObject = inputDrinkConfig.filter(
    (item) => item.drinkType === drinkType.drinkType
  )[0];

  const hydroFactor = inputBottleObject?.hydroFactor ?? 0;
  const abv = inputBottleObject?.abv ?? 0;

  const addDrink = async () => {
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

    dispatch(addToHistory(drinkItem));
    if (userUID) {
      await addDrinkToUserHistory(userUID, drinkItem, isInternetReachable);
    }
  };

  return { addDrink };
}

export { useAddDrink };
