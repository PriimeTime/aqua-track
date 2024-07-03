import {
  FONT_SIZE_15,
  FONT_SIZE_20,
  FONT_SIZE_34,
  SCREEN_SIZE,
} from "@/utils/constants";

const registerFormErrorFontSizeObj = {
  SMALL: FONT_SIZE_15,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_34,
};

const registerFormErrorFontSize = registerFormErrorFontSizeObj[SCREEN_SIZE];

export { registerFormErrorFontSize };
