import { UID } from "../types/UID";
import { DrinkHistoryItemWithoutID } from "./DrinkHistoryItemWithoutID";

export interface DrinkHistoryItem extends DrinkHistoryItemWithoutID {
  id: UID;
}
