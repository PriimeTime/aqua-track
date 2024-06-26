import {
  FONT_SIZE_15,
  FONT_SIZE_17,
  FONT_SIZE_20,
  FONT_SIZE_24,
  FONT_SIZE_34,
  FONT_SIZE_48,
  SCREEN_SIZE,
} from "@/utils/constants";

const customTextFieldFontSizeObj = {
  SMALL: FONT_SIZE_15,
  MEDIUM: FONT_SIZE_20,
  LARGE: FONT_SIZE_34,
};

const customTextFieldLabelFontSizeObj = {
  SMALL: FONT_SIZE_17,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_48,
};

const customTextFieldFontSize = customTextFieldFontSizeObj[SCREEN_SIZE];
const customTextFieldLabelFontSize =
  customTextFieldLabelFontSizeObj[SCREEN_SIZE];

export { customTextFieldFontSize, customTextFieldLabelFontSize };
