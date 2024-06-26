import {
  FONT_SIZE_24,
  FONT_SIZE_34,
  FONT_SIZE_60,
  SCREEN_SIZE,
} from "@/utils/constants";

const totalIntakeFontSizeObj = {
  SMALL: FONT_SIZE_24,
  MEDIUM: FONT_SIZE_34,
  LARGE: FONT_SIZE_60,
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
  SMALL: 30,
  MEDIUM: 36,
  LARGE: 72,
};

const totalIntakeCardBorderRadius = totalIntakeCardBorderRadiusObj[SCREEN_SIZE];
const totalIntakeFontSize = totalIntakeFontSizeObj[SCREEN_SIZE];
const totalIntakeCardPadding = {
  paddingHorizontal: paddingHorizontal[SCREEN_SIZE],
  paddingVertical: paddingVertical[SCREEN_SIZE],
};

export {
  totalIntakeFontSize,
  totalIntakeCardPadding,
  totalIntakeCardBorderRadius,
};
