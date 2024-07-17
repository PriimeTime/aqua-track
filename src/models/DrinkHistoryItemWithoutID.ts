import { type UnixDate } from "@/types/UnixDate";
import { DrinkType } from "@/enums/maps/DrinkType";

export interface DrinkHistoryItemWithoutID {
  color: string;
  drinkType: DrinkType;
  hydrationQuantity: number;
  imageSrc: string;
  label: string;
  quantity: number;
  date: UnixDate;
  typeID: number;
  abv: number;
}
