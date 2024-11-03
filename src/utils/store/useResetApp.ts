import { useDispatch } from "react-redux";

import { setHistory } from "@/store/drinkHistory";
import { setUserMetrics, setUserLoginState } from "@/store/userData";
import { setAppState } from "@/store/general";

import { HAS_BEEN_STARTED, initialUserMetrics } from "@/utils/constants";

import { writeAsyncStorage } from "@/utils/storage";

/** TODO: CURRENTLY UNUSED! */

/**
 * Custom hook to reset the Redux store to its default state.
 *
 * This hook provides a function, `resetApp`, that can be called to reset
 * various parts of the Redux store to their default states as well as setting back the app to default state.
 * It dispatches actions to clear the user's drink history, reset user metrics to their
 * default values, set the user's login state to logged out and set `hasBeenStarted` state to false
 *
 * @returns an object containing the `resetApp` function
 */
export const useResetApp = () => {
  const dispatch = useDispatch();

  const resetApp = async () => {
    dispatch(setHistory([]));
    dispatch(setUserMetrics(initialUserMetrics));
    dispatch(setUserLoginState(false));
    dispatch(setAppState({ reset: true }));
    await writeAsyncStorage(HAS_BEEN_STARTED, false);
  };

  return { resetApp };
};
