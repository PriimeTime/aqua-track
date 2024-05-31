import { DrinkHistoryItem } from "./DrinkHistoryItem";
import { UserMetrics } from "./UserMetrics";

export interface UserData {
  userMetrics: UserMetrics;
  userDrinkHistory: DrinkHistoryItem[];
  userUID: string;
}
