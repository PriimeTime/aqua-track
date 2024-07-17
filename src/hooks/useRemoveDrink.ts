import { useDispatch } from "react-redux";

import { removeFromHistory } from "@/store/drinkHistory";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { type UserUID } from "@/types/UserUID";

import { removeDrinkFromUserHistory } from "@/utils/database";

/**
 * Custom hook to remove a drink from the user's drink history.
 *
 * This hook provides a function, `removeDrink`, that dispatches an action to remove
 * a drink from the local Redux store and, if the user is logged in, it also removes
 * the drink from the user's history in the database.
 *
 * @param {*} item
 * @param {*} userUID
 * @param {*} isInternetReachable
 * @returns an object containing the `removeDrink` function
 */
function useRemoveDrink(
  item: DrinkHistoryItem,
  userUID: UserUID,
  isInternetReachable: boolean
) {
  const dispatch = useDispatch();

  const removeDrink = () => {
    setTimeout(async () => {
      dispatch(removeFromHistory(item.id));
      if (userUID) {
        await removeDrinkFromUserHistory(userUID, item, isInternetReachable);
      }
    }, 150);
  };

  return { removeDrink };
}

export { useRemoveDrink };
