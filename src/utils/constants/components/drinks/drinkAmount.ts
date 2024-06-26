import { FONT_SIZE_34, FONT_SIZE_72, SCREEN_SIZE } from "@/utils/constants";

const drinkAmountFontSizeObj = {
  SMALL: FONT_SIZE_34,
  MEDIUM: FONT_SIZE_34,
  LARGE: FONT_SIZE_72,
};

const drinkAmountSensitivityObj = {
  SMALL: 0.75,
  MEDIUM: 0.45,
  LARGE: 0.25,
};

const drinkAmountFontSize = drinkAmountFontSizeObj[SCREEN_SIZE];
const drinkAmountSensitivity = drinkAmountSensitivityObj[SCREEN_SIZE];

export { drinkAmountFontSize, drinkAmountSensitivity };
