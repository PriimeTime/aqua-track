import { DrinkImage } from "@/enums/DrinkImage";
import { UnixDate } from "./UnixDate";
import { DrinkType } from "@/enums/DrinkType";

export interface DrinkHistoryItemWithoutID {
  color: string;
  drinkType: DrinkType;
  hydrationQuantity: number;
  imageSrc: DrinkImage;
  label: string;
  quantity: number;
  time: UnixDate;
  typeID: number;
}
