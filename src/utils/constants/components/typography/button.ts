import {
  FONT_SIZE_15,
  FONT_SIZE_17,
  FONT_SIZE_20,
  FONT_SIZE_22,
  FONT_SIZE_48,
  SCREEN_SIZE,
} from "@/utils/constants";

const primaryButtonFontSizeObj = {
  SMALL: FONT_SIZE_17,
  MEDIUM: FONT_SIZE_22,
  LARGE: FONT_SIZE_48,
};

const modalPrimaryButtonFontSizeObj = {
  SMALL: FONT_SIZE_15,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_48,
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
const modalPrimaryButtonFontSize = modalPrimaryButtonFontSizeObj[SCREEN_SIZE];
const primaryButtonRadius = primaryButtonRadiusObj[SCREEN_SIZE];
const primaryButtonWrapperHeight = primaryButtonWrapperHeightObj[SCREEN_SIZE];

export {
  primaryButtonFontSize,
  modalPrimaryButtonFontSize,
  primaryButtonRadius,
  primaryButtonWrapperHeight,
};
