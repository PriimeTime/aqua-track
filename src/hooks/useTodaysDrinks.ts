import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "react-native";

import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { ONE_DAY } from "@/utils/constants";

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

  const [todaysDrinks, setTodaysDrinks] = useState<DrinkHistoryItem[]>([]);

  const getStartOfToday = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  };

  const updateTodaysDrinks = () => {
    const startOfToday = getStartOfToday();
    const filteredDrinks = drinkHistory.filter(
      (drink) =>
        new Date(drink.date).getTime() >= startOfToday &&
        new Date(drink.date).getTime() < startOfToday + ONE_DAY
    );
    setTodaysDrinks(filteredDrinks);
  };

  useEffect(() => {
    updateTodaysDrinks();

    // Calculate time remaining until midnight
    const now = new Date();
    const timeUntilMidnight =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      ).getTime() - now.getTime();

    // Set a timeout to update the current date at midnight
    const midnightTimeout = setTimeout(() => {
      updateTodaysDrinks();
    }, timeUntilMidnight);

    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          updateTodaysDrinks();
        }
      }
    );

    // Cleanup the timer and listener when the component unmounts
    return () => {
      clearTimeout(midnightTimeout);
      appStateListener.remove();
    };
  }, [drinkHistory]);

  return todaysDrinks;
}

export { useTodaysDrinks };
