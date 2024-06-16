import { type UID } from "@/types/UID";
import { DrinkHistoryItemWithoutID } from "@/models/DrinkHistoryItemWithoutID";

export interface DrinkHistoryItem extends DrinkHistoryItemWithoutID {
  id: UID;
}
