import { useSelector } from "react-redux";

import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

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
