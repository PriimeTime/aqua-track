import {
  FONT_SIZE_24,
  FONT_SIZE_28,
  FONT_SIZE_30,
  FONT_SIZE_48,
  FONT_SIZE_60,
  SCREEN_SIZE,
} from "@/utils/constants";

const mainHeaderFontSizeObj = {
  SMALL: FONT_SIZE_24,
  MEDIUM: FONT_SIZE_30,
  LARGE: FONT_SIZE_48,
};

const headerFontSizeObj = {
  SMALL: FONT_SIZE_28,
  MEDIUM: FONT_SIZE_30,
  LARGE: FONT_SIZE_60,
};

const mainHeaderFontSize = mainHeaderFontSizeObj[SCREEN_SIZE];
const headerFontSize = headerFontSizeObj[SCREEN_SIZE];

export { mainHeaderFontSize, headerFontSize };
