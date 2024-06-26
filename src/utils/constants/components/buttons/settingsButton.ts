import { SCREEN_SIZE } from "@/utils/constants";

const settingsButtonSizeObj = {
  SMALL: 48,
  MEDIUM: 64,
  LARGE: 128,
};

const settingsIconSizeObj = {
  SMALL: 25,
  MEDIUM: 35,
  LARGE: 70,
};

const settingsButtonSize = settingsButtonSizeObj[SCREEN_SIZE];
const settingsIconSize = settingsIconSizeObj[SCREEN_SIZE];

export { settingsButtonSize, settingsIconSize };
