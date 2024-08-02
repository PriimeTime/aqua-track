import { SCREEN_SIZE } from "@/utils/constants";

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

const settingsListItemGap = settingsListItemGapObj[SCREEN_SIZE];
const settingsListMarginTop = settingsListMarginTopObj[SCREEN_SIZE];

export { settingsListItemGap, settingsListMarginTop };
