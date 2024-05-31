import { UID } from "./UID";
import { DrinkHistoryItemWithoutID } from "./DrinkHistoryItemWithoutID";

export interface DrinkHistoryItem extends DrinkHistoryItemWithoutID {
  id: UID;
}
