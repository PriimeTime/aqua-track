import {
  FONT_SIZE_28,
  FONT_SIZE_34,
  FONT_SIZE_72,
  SCREEN_SIZE,
} from "@/utils/constants";

const mainHeaderFontSizeObj = {
  SMALL: FONT_SIZE_28,
  MEDIUM: FONT_SIZE_34,
  LARGE: FONT_SIZE_72,
};

const mainHeaderFontSize = mainHeaderFontSizeObj[SCREEN_SIZE];

export { mainHeaderFontSize };
