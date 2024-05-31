import { DrinkHistory } from "./DrinkHistory";
import { userMetrics } from "./UserMetrics";

export interface UserData {
  userMetrics: userMetrics;
  userDrinkHistory: DrinkHistory[];
  userUID: string;
}
