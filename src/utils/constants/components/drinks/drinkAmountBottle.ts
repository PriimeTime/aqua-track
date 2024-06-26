import { SCREEN_SIZE } from "@/utils/constants";

const drinkAmountBottleHeightObj = {
  SMALL: 275,
  MEDIUM: 380,
  LARGE: 600,
};

const drinkAmountBottleWidthObj = {
  SMALL: 150,
  MEDIUM: 190,
  LARGE: 300,
};

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

const drinkAmountBottleHeight = drinkAmountBottleHeightObj[SCREEN_SIZE];
const drinkAmountBottleWidth = drinkAmountBottleWidthObj[SCREEN_SIZE];
const drinkAmountBorderWidth = drinkAmountBorderWidthObj[SCREEN_SIZE];
const drinkAmountRadius = drinkAmountRadiusObj[SCREEN_SIZE];

export {
  drinkAmountBottleHeight,
  drinkAmountBottleWidth,
  drinkAmountBorderWidth,
  drinkAmountRadius,
};
