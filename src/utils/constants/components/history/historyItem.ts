import {
  FONT_SIZE_13,
  FONT_SIZE_16,
  FONT_SIZE_17,
  FONT_SIZE_20,
  FONT_SIZE_22,
  FONT_SIZE_24,
  FONT_SIZE_28,
  FONT_SIZE_48,
  SCREEN_SIZE,
} from "@/utils/constants";

const historyItemBorderRadiusObj = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 25,
};

const infoCardCurrentAmountHeightObj = {
  SMALL: 30,
  MEDIUM: 40,
  LARGE: 60,
};

const infoCardCurrentAmountWidthObj = {
  SMALL: 80,
  MEDIUM: 100,
  LARGE: 140,
};

const infoCardCurrentAmountRadiusObj = {
  SMALL: 10,
  MEDIUM: 12.5,
  LARGE: 20,
};

const infoCardCurrentAmountFontSizeObj = {
  SMALL: FONT_SIZE_17,
  MEDIUM: FONT_SIZE_22,
  LARGE: FONT_SIZE_28,
};

const infoCardTotalAmountFontSizeObj = {
  SMALL: FONT_SIZE_13,
  MEDIUM: FONT_SIZE_16,
  LARGE: FONT_SIZE_22,
};

const infoCardTotalAmountWidthObj = {
  SMALL: 50,
  MEDIUM: 60,
  LARGE: 100,
};

const infoCardTotalAmountHeightObj = {
  SMALL: 25,
  MEDIUM: 25,
  LARGE: 40,
};

const infoCardTotalAmountRadiusObj = {
  SMALL: 7.5,
  MEDIUM: 10,
  LARGE: 12.5,
};

const historyItemPrimaryTextFontSizeObj = {
  SMALL: FONT_SIZE_22,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_48,
};

const historyItemSecondaryTextFontSizeObj = {
  SMALL: FONT_SIZE_16,
  MEDIUM: FONT_SIZE_17,
  LARGE: FONT_SIZE_28,
};

const infoCardSizeTotalFontSizeObj = {
  SMALL: FONT_SIZE_16,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_24,
};

const infoCardCurrentAmountHeight = infoCardCurrentAmountHeightObj[SCREEN_SIZE];
const infoCardCurrentAmountWidth = infoCardCurrentAmountWidthObj[SCREEN_SIZE];
const infoCardCurrentAmountRadius = infoCardCurrentAmountRadiusObj[SCREEN_SIZE];
const infoCardCurrentAmountFontSize =
  infoCardCurrentAmountFontSizeObj[SCREEN_SIZE];
const infoCardTotalAmountFontSize = infoCardTotalAmountFontSizeObj[SCREEN_SIZE];
const infoCardTotalAmountWidth = infoCardTotalAmountWidthObj[SCREEN_SIZE];
const infoCardTotalAmountHeight = infoCardTotalAmountHeightObj[SCREEN_SIZE];
const infoCardTotalAmountRadius = infoCardTotalAmountRadiusObj[SCREEN_SIZE];
const historyItemPrimaryTextFontSize =
  historyItemPrimaryTextFontSizeObj[SCREEN_SIZE];
const historyItemSecondaryTextFontSize =
  historyItemSecondaryTextFontSizeObj[SCREEN_SIZE];
const historyItemBorderRadius = historyItemBorderRadiusObj[SCREEN_SIZE];
const infoCardSizeTotalFontSize = infoCardSizeTotalFontSizeObj[SCREEN_SIZE];

export {
  infoCardCurrentAmountHeight,
  infoCardCurrentAmountWidth,
  infoCardCurrentAmountRadius,
  infoCardCurrentAmountFontSize,
  infoCardTotalAmountFontSize,
  infoCardTotalAmountWidth,
  infoCardTotalAmountHeight,
  infoCardTotalAmountRadius,
  historyItemPrimaryTextFontSize,
  historyItemSecondaryTextFontSize,
  historyItemBorderRadius,
  infoCardSizeTotalFontSize,
};
