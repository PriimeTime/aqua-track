import {
  FONT_SIZE_22,
  FONT_SIZE_28,
  FONT_SIZE_48,
  SCREEN_SIZE,
} from "@/utils/constants";

const settingsItemFontSizeObj = {
  SMALL: FONT_SIZE_22,
  MEDIUM: FONT_SIZE_28,
  LARGE: FONT_SIZE_48,
};

const settingsItemFontSize = settingsItemFontSizeObj[SCREEN_SIZE];

export { settingsItemFontSize };
