import {
  FONT_SIZE_22,
  FONT_SIZE_24,
  FONT_SIZE_48,
  SCREEN_SIZE,
} from "@/utils/constants";

const cardButtonBorderRadiusObj = {
  SMALL: 24,
  MEDIUM: 24,
  LARGE: 48,
};

const cardButtonFontSizeObj = {
  SMALL: FONT_SIZE_22,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_48,
};

const cardButtonBorderWidthObj = {
  SMALL: 1,
  MEDIUM: 1.5,
  LARGE: 3,
};

const cardButtonFontSize = cardButtonFontSizeObj[SCREEN_SIZE];
const cardButtonBorderRadius = cardButtonBorderRadiusObj[SCREEN_SIZE];
const cardButtonBorderWidth = cardButtonBorderWidthObj[SCREEN_SIZE];

export { cardButtonFontSize, cardButtonBorderRadius, cardButtonBorderWidth };
