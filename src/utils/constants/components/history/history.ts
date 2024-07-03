import { SCREEN_SIZE } from "@/utils/constants";

const historyItemGapObj = {
  SMALL: 8,
  MEDIUM: 10,
  LARGE: 20,
};

const historyItemGap = historyItemGapObj[SCREEN_SIZE];

export { historyItemGap };
