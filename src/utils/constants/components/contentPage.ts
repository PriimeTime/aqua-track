import { FONT_SIZE_34, FONT_SIZE_72, SCREEN_SIZE } from "@/utils/constants";

const contentPageFontSizeObj = {
  SMALL: FONT_SIZE_34,
  MEDIUM: FONT_SIZE_34,
  LARGE: FONT_SIZE_72,
};

const contentPageFontSize = contentPageFontSizeObj[SCREEN_SIZE];

export { contentPageFontSize };
