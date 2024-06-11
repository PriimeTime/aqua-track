import { DrinkType } from "@/enums/maps/DrinkType";

export interface DrinkItem {
  color: string;
  drinkType: DrinkType;
  imageSrc: string;
  label: string;
  typeID: number;
}
