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

export const useResetStore = () => {
  const dispatch = useDispatch();

  const resetStore = async () => {
    dispatch(setHistory([]));
    dispatch(setUserMetrics(defaultUserMetrics));
    dispatch(setUserLoginState(false));
  };

  return { resetStore };
};
