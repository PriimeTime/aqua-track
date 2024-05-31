import { DrinkImage } from "@/types/DrinkImage";
import { UID } from "./UID";
import { UnixDate } from "./UnixDate";
import { DrinkType } from "@/types/DrinkType";

export interface DrinkHistory {
  color: string;
  drinkType: DrinkType;
  hydrationQuantity: number;
  id: UID;
  imageSrc: DrinkImage;
  label: string;
  quantity: number;
  time: UnixDate;
  typeID: number;
}
