import { SCREEN_SIZE } from "@/utils/constants";

const cardButtonBorderRadiusObj = {
  SMALL: 24,
  MEDIUM: 24,
  LARGE: 48,
};

const cardButtonBorderWidthObj = {
  SMALL: 1,
  MEDIUM: 1.5,
  LARGE: 3,
};

const cardButtonBorderRadius = cardButtonBorderRadiusObj[SCREEN_SIZE];
const cardButtonBorderWidth = cardButtonBorderWidthObj[SCREEN_SIZE];

export { cardButtonBorderRadius, cardButtonBorderWidth };
