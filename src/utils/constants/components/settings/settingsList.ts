import { FONT_SIZE_34, FONT_SIZE_72, SCREEN_SIZE } from "@/utils/constants";

const settingsListFontSizeObj = {
  SMALL: FONT_SIZE_34,
  MEDIUM: FONT_SIZE_34,
  LARGE: FONT_SIZE_72,
};

const settingsListItemGapObj = {
  SMALL: 8,
  MEDIUM: 10,
  LARGE: 20,
};

const settingsListMarginTopObj = {
  SMALL: 50,
  MEDIUM: 50,
  LARGE: 150,
};

const settingsListFontSize = settingsListFontSizeObj[SCREEN_SIZE];
const settingsListItemGap = settingsListItemGapObj[SCREEN_SIZE];
const settingsListMarginTop = settingsListMarginTopObj[SCREEN_SIZE];

export { settingsListFontSize, settingsListItemGap, settingsListMarginTop };
