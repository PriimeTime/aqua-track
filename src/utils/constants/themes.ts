import { ScreenSize } from "@/enums/maps/ScreenSize";

import { FontSizeConfig } from "@/models/FontSizeConfig";
import { ResponsiveSize } from "@/models/ResponsiveSize";

const color = {
  WHITE: "#FFFFFF",
  LIGHTBLUE: "#8FC7FF",
  LIGHTBLUE_OPACITY_0_2: "rgba(143, 199, 255, 0.2)",
  BLUE: "#3C91E6",
  DARK_BLUE: "#003061",
  RED: "#FF7575",
  BLACK: "#000000",

  GRADIENT_LIGHTER_BLUE: "#BADCFF",
  GRADIENT_DARKER_BLUE: "#DCEFFF",

  APP_PRIMARY_BACKGROUND_FIRST_GRADIENT: "#FFFFFF", // WHITE
  APP_PRIMARY_BACKGROUND_SECOND_GRADIENT: "#CCE7FF",
  APP_SECONDARY_BACKGROUND: "#516CC9",
};

const fontFamily = {
  DEFAULT: "Chewy-Regular",
  SYSTEM: "System",
  GOOGLE: "Roboto",
};

const shadow = {
  shadowColor: color.BLUE,
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};

const dimensions = {
  CARD_BUTTON_HEIGHT_PHONE: 120,
  CARD_BUTTON_HEIGHT_TABLET: 240,
  LIST_ITEM_HEIGHT_SMALL: 80,
  LIST_ITEM_HEIGHT_MEDIUM: 100,
  LIST_ITEM_HEIGHT_LARGE: 150,
};

const inputFontSizeValues = {
  1: { fontSize: 12 },
  2: { fontSize: 14 },
  3: { fontSize: 16 },
  4: { fontSize: 18 },
  5: { fontSize: 20 },
  6: { fontSize: 24 },
  7: { fontSize: 36 },
  8: { fontSize: 48 },
};

const getFontSizeForScreen = (
  fontSizeConfig: FontSizeConfig,
  screenSize: ScreenSize,
  sizes: ResponsiveSize
): number => {
  const sizeKey = sizes[screenSize];
  const fontSize = fontSizeConfig[sizeKey]?.fontSize;

  if (fontSize === undefined) {
    throw new Error(
      `Font size for key ${sizeKey} is not defined in fontSizeConfig`
    );
  }

  return fontSize;
};

const listItemHeight = {
  SMALL: dimensions.LIST_ITEM_HEIGHT_SMALL,
  MEDIUM: dimensions.LIST_ITEM_HEIGHT_MEDIUM,
  LARGE: dimensions.LIST_ITEM_HEIGHT_LARGE,
};

const inputFieldHeight = {
  SMALL: 40,
  MEDIUM: 50,
  LARGE: 100,
};

const cardBorderWidth = {
  SMALL: 1,
  MEDIUM: 1.5,
  LARGE: 3,
};

export {
  color,
  shadow,
  dimensions,
  listItemHeight,
  inputFieldHeight,
  cardBorderWidth,
  fontFamily,
  inputFontSizeValues,
  getFontSizeForScreen,
};
