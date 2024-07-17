import { useDispatch } from "react-redux";
import { setHistory } from "@/store/drinkHistory";
import { setUserMetrics, setUserLoginState } from "@/store/userData";
import { UserMetrics } from "@/models/UserMetrics";

const defaultUserMetrics: UserMetrics = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  exerciseLvl: null,
};

/**
 * Custom hook to reset the Redux store to its default state.
 *
 * This hook provides a function, `resetStore`, that can be called to reset
 * various parts of the Redux store to their default states. It dispatches
 * actions to clear the user's drink history, reset user metrics to their
 * default values, and set the user's login state to logged out.
 *
 * @returns {object} An object containing the `resetStore` function
 */
export const useResetStore = () => {
  const dispatch = useDispatch();

  const resetStore = async () => {
    dispatch(setHistory([]));
    dispatch(setUserMetrics(defaultUserMetrics));
    dispatch(setUserLoginState(false));
  };

  return { resetStore };
};
