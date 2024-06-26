import { FONT_SIZE_34, FONT_SIZE_72, SCREEN_SIZE } from "@/utils/constants";

const drinkSelectionFontSizeObj = {
  SMALL: FONT_SIZE_34,
  MEDIUM: FONT_SIZE_34,
  LARGE: FONT_SIZE_72,
};

const drinkSelectionFontSize = drinkSelectionFontSizeObj[SCREEN_SIZE];

export { drinkSelectionFontSize };
