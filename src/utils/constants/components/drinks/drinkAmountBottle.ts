import { SCREEN_SIZE } from "@/utils/constants";

const drinkAmountBorderWidthObj = {
  SMALL: 10,
  MEDIUM: 12,
  LARGE: 18,
};

const drinkAmountRadiusObj = {
  SMALL: 20,
  MEDIUM: 24,
  LARGE: 42,
};

const drinkAmountBorderWidth = drinkAmountBorderWidthObj[SCREEN_SIZE];
const drinkAmountRadius = drinkAmountRadiusObj[SCREEN_SIZE];

export { drinkAmountBorderWidth, drinkAmountRadius };
