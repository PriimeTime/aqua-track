import { FONT_SIZE_24, FONT_SIZE_28, SCREEN_SIZE } from "@/utils/constants";

const actionModalFontSizeObj = {
  SMALL: FONT_SIZE_24,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_28,
};

const actionModalRadiusObj = {
  SMALL: 25,
  MEDIUM: 30,
  LARGE: 60,
};

const actionModalFontSize = actionModalFontSizeObj[SCREEN_SIZE];
const actionModalRadius = actionModalRadiusObj[SCREEN_SIZE];

export { actionModalFontSize, actionModalRadius };
