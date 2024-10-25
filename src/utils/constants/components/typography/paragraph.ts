import {
  FONT_SIZE_13,
  FONT_SIZE_15,
  FONT_SIZE_20,
  FONT_SIZE_24,
  SCREEN_SIZE,
} from "@/utils/constants";

import { ms } from "react-native-size-matters";

const paragraphSmallFontSizeObj = {
  SMALL: FONT_SIZE_13,
  MEDIUM: FONT_SIZE_15,
  LARGE: FONT_SIZE_20,
};

const paragraphVerySmallFontSize = ms(FONT_SIZE_13);
const paragraphSmallFontSize = paragraphSmallFontSizeObj[SCREEN_SIZE];
const paragraphMediumFontSize = ms(FONT_SIZE_20);
const paragraphLargeFontSize = ms(FONT_SIZE_24);

export {
  paragraphVerySmallFontSize,
  paragraphSmallFontSize,
  paragraphMediumFontSize,
  paragraphLargeFontSize,
};
