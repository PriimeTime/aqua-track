import { useSelector } from "react-redux";

import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

function useGroupedDrinkHistoryQuantity(typeID: number): number {
  const drinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );

  const totalQuantity = drinkHistory
    .filter((item) => item.typeID === typeID)
    .reduce((total, item) => total + item.quantity, 0);

  return totalQuantity;
}

export { useGroupedDrinkHistoryQuantity };
