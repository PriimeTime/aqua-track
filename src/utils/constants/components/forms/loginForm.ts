import {
  FONT_SIZE_16,
  FONT_SIZE_20,
  FONT_SIZE_34,
  SCREEN_SIZE,
} from "@/utils/constants";

const loginFormErrorFontSizeObj = {
  SMALL: FONT_SIZE_16,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_34,
};

const loginFormErrorFontSize = loginFormErrorFontSizeObj[SCREEN_SIZE];

export { loginFormErrorFontSize };
