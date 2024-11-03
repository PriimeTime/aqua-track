import { SCREEN_SIZE } from "@/utils/constants";

const drinkAmountSensitivityObj = {
  SMALL: 0.75,
  MEDIUM: 0.3,
  LARGE: 0.25,
};

const drinkAmountSensitivity = drinkAmountSensitivityObj[SCREEN_SIZE];

export { drinkAmountSensitivity };
