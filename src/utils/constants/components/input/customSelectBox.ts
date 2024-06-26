import {
  FONT_SIZE_17,
  FONT_SIZE_24,
  FONT_SIZE_48,
  SCREEN_SIZE,
} from "@/utils/constants";

const customSelectBoxLabelFontSizeObj = {
  SMALL: FONT_SIZE_17,
  MEDIUM: FONT_SIZE_24,
  LARGE: FONT_SIZE_48,
};

const customSelectBoxLabelFontSize =
  customSelectBoxLabelFontSizeObj[SCREEN_SIZE];

export { customSelectBoxLabelFontSize };
