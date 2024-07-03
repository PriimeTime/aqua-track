import { SCREEN_SIZE } from "@/utils/constants";

const historyButtonIconSizeObj = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 45,
};

const historyButtonRadiusObj = {
  SMALL: 10,
  MEDIUM: 15,
  LARGE: 25,
};

const historyButtonIconSize = historyButtonIconSizeObj[SCREEN_SIZE];
const historyButtonRadius = historyButtonRadiusObj[SCREEN_SIZE];

export { historyButtonIconSize, historyButtonRadius };
