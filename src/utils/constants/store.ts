import { UserAuth } from "@/models/UserAuth";
import { UserMetrics } from "@/models/UserMetrics";

const initialUserMetrics: UserMetrics = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  exerciseLvl: null,
  measurementSystem: null,
  dailyHydrationGoal: 2600,
};

const initialUserAuth: UserAuth = {
  userName: null,
  isLoggedIn: false,
  email: null,
  uid: null,
};

export { initialUserMetrics, initialUserAuth };
