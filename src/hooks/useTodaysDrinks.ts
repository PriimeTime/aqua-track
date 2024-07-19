import { useSelector } from "react-redux";

import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

/**
 * Custom hook to filter and return today's drinks from the drink history.
 *
 * This hook retrieves the drink history from the Redux store and filters it to
 * include only the drinks that were logged today. The start of today is calculated
 * by setting the hours, minutes, seconds, and milliseconds to zero.
 *
 * @returns an array of drink history items logged today.
 */
function useTodaysDrinks() {
  const drinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // Set to the start of today (midnight)

  return drinkHistory.filter(
    (drink) => new Date(drink.date).getTime() >= startOfToday.getTime()
  );
}

export { useTodaysDrinks };
