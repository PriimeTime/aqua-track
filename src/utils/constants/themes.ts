import { ms } from "react-native-size-matters";

import { ScreenSize } from "@/enums/maps/ScreenSize";

import { FontSizeConfig } from "@/models/FontSizeConfig";
import { ResponsiveSize } from "@/models/ResponsiveSize";

const color = {
  TRANSPARENT: "transparent",
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
  shadowOffset: { width: ms(5), height: ms(5) },
  shadowOpacity: ms(0.2),
  shadowRadius: ms(5),
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

const inputFieldHeight = ms(50);
const cardBorderWidth = ms(1.5);

export {
  color,
  shadow,
  dimensions,
  inputFieldHeight,
  cardBorderWidth,
  fontFamily,
  inputFontSizeValues,
  getFontSizeForScreen,
};
