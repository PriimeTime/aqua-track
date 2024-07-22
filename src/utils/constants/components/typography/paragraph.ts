import {
  FONT_SIZE_13,
  FONT_SIZE_16,
  FONT_SIZE_34,
  SCREEN_SIZE,
} from "@/utils/constants";

const paragraphFontSizeObj = {
  SMALL: FONT_SIZE_13,
  MEDIUM: FONT_SIZE_16,
  LARGE: FONT_SIZE_34,
};

const paragraphFontSize = paragraphFontSizeObj[SCREEN_SIZE];

export { paragraphFontSize };
