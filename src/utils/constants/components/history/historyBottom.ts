import { SCREEN_SIZE } from "@/utils/constants";

const historyBottomLineBorderTopWidthObj = {
  SMALL: 1.5,
  MEDIUM: 2,
  LARGE: 3,
};

const historyBottomLineHeightObj = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 40,
};

const historyBottomTextIndentObj = {
  SMALL: 20,
  MEDIUM: 20,
  LARGE: 50,
};

const historyBottomFontSizeObj = {
  SMALL: 18,
  MEDIUM: 24,
  LARGE: 36,
};

const historyBottomLineBorderTopWidth =
  historyBottomLineBorderTopWidthObj[SCREEN_SIZE];
const historyBottomLineHeight = historyBottomLineHeightObj[SCREEN_SIZE];
const historyBottomTextIndent = historyBottomTextIndentObj[SCREEN_SIZE];
const historyBottomFontSize = historyBottomFontSizeObj[SCREEN_SIZE];

export {
  historyBottomLineBorderTopWidth,
  historyBottomLineHeight,
  historyBottomTextIndent,
  historyBottomFontSize,
};
