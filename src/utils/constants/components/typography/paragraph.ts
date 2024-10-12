import {
  FONT_SIZE_12,
  FONT_SIZE_13,
  FONT_SIZE_15,
  FONT_SIZE_17,
  FONT_SIZE_20,
  FONT_SIZE_24,
  FONT_SIZE_34,
  FONT_SIZE_40,
  SCREEN_SIZE,
} from "@/utils/constants";

const paragraphVerySmallFontSizeObj = {
  SMALL: FONT_SIZE_12,
  MEDIUM: FONT_SIZE_13,
  LARGE: FONT_SIZE_24,
};

const paragraphSmallFontSizeObj = {
  SMALL: FONT_SIZE_13,
  MEDIUM: FONT_SIZE_15,
  LARGE: FONT_SIZE_20,
};

const paragraphMediumFontSizeObj = {
  SMALL: FONT_SIZE_17,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_34,
};

const paragraphLargeFontSizeObj = {
  SMALL: FONT_SIZE_20,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_40,
};

const paragraphVerySmallFontSize = paragraphVerySmallFontSizeObj[SCREEN_SIZE];
const paragraphSmallFontSize = paragraphSmallFontSizeObj[SCREEN_SIZE];
const paragraphMediumFontSize = paragraphMediumFontSizeObj[SCREEN_SIZE];
const paragraphLargeFontSize = paragraphLargeFontSizeObj[SCREEN_SIZE];

export {
  paragraphVerySmallFontSize,
  paragraphSmallFontSize,
  paragraphMediumFontSize,
  paragraphLargeFontSize,
};
