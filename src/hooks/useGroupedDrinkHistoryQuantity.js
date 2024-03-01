import { useSelector } from "react-redux";

function useGroupedDrinkHistoryQuantity(typeID) {
  const drinkHistory = useSelector((state) => state.drinkHistory);

  const reducedDrinkHistory = Object.values(
    drinkHistory.reduce((acc, item) => {
      if (!acc[item.typeID]) {
        acc[item.typeID] = { ...item };
      } else {
        acc[item.typeID].quantity += item.quantity;
      }
      return acc;
    }, {})
  );

  const retVal = reducedDrinkHistory.find((item) => item.typeID === typeID);

  return retVal?.quantity;
}

export { useGroupedDrinkHistoryQuantity };
