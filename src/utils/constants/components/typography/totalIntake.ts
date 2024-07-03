import {
  FONT_SIZE_15,
  FONT_SIZE_20,
  FONT_SIZE_28,
  FONT_SIZE_34,
  FONT_SIZE_48,
  FONT_SIZE_72,
  SCREEN_SIZE,
} from "@/utils/constants";

const timeUntilSoberFontSizeObj = {
  SMALL: FONT_SIZE_20,
  MEDIUM: FONT_SIZE_28,
  LARGE: FONT_SIZE_48,
};

const timeUntilSoberTextFontSizeObj = {
  SMALL: FONT_SIZE_15,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_34,
};

const totalIntakeFontSizeObj = {
  SMALL: FONT_SIZE_28,
  MEDIUM: FONT_SIZE_34,
  LARGE: FONT_SIZE_72,
};

const paddingHorizontal = {
  SMALL: 20,
  MEDIUM: 27.5,
  LARGE: 30,
};

const paddingVertical = {
  SMALL: 10,
  MEDIUM: 12.5,
  LARGE: 15,
};

const totalIntakeCardBorderRadiusObj = {
  SMALL: 26,
  MEDIUM: 36,
  LARGE: 58,
};

const totalIntakeCardBorderRadius = totalIntakeCardBorderRadiusObj[SCREEN_SIZE];
const totalIntakeFontSize = totalIntakeFontSizeObj[SCREEN_SIZE];
const timeUntilSoberFontSize = timeUntilSoberFontSizeObj[SCREEN_SIZE];
const timeUntilSoberTextFontSize = timeUntilSoberTextFontSizeObj[SCREEN_SIZE];
const totalIntakeCardPadding = {
  paddingHorizontal: paddingHorizontal[SCREEN_SIZE],
  paddingVertical: paddingVertical[SCREEN_SIZE],
};

export {
  totalIntakeFontSize,
  totalIntakeCardPadding,
  totalIntakeCardBorderRadius,
  timeUntilSoberFontSize,
  timeUntilSoberTextFontSize,
};
