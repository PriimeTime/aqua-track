import { DrinkImage } from "@/enums/DrinkImage";
import { type UnixDate } from "../types/UnixDate";
import { DrinkType } from "@/enums/DrinkType";

export interface DrinkHistoryItemWithoutID {
  color: string;
  drinkType: DrinkType;
  hydrationQuantity: number;
  imageSrc: DrinkImage;
  label: string;
  quantity: number;
  date: UnixDate;
  typeID: number;
}
