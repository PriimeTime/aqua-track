import {
  FONT_SIZE_20,
  FONT_SIZE_24,
  FONT_SIZE_60,
  SCREEN_SIZE,
} from "@/utils/constants";

const primaryButtonFontSizeObj = {
  SMALL: FONT_SIZE_20,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_60,
};

const primaryButtonRadiusObj = {
  SMALL: 30,
  MEDIUM: 30,
  LARGE: 60,
};

const primaryButtonWrapperHeightObj = {
  SMALL: 60,
  MEDIUM: 75,
  LARGE: 150,
};

const primaryButtonFontSize = primaryButtonFontSizeObj[SCREEN_SIZE];
const primaryButtonRadius = primaryButtonRadiusObj[SCREEN_SIZE];
const primaryButtonWrapperHeight = primaryButtonWrapperHeightObj[SCREEN_SIZE];

export {
  primaryButtonFontSize,
  primaryButtonRadius,
  primaryButtonWrapperHeight,
};
