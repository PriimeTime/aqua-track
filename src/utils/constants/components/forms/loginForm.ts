import {
  FONT_SIZE_16,
  FONT_SIZE_20,
  FONT_SIZE_24,
  FONT_SIZE_34,
  FONT_SIZE_60,
  SCREEN_SIZE,
} from "@/utils/constants";

const loginFormFontSizeObj = {
  SMALL: FONT_SIZE_20,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_60,
};

const loginFormErrorFontSizeObj = {
  SMALL: FONT_SIZE_16,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_34,
};

const loginFormFontSize = loginFormFontSizeObj[SCREEN_SIZE];
const loginFormErrorFontSize = loginFormErrorFontSizeObj[SCREEN_SIZE];

export { loginFormFontSize, loginFormErrorFontSize };
