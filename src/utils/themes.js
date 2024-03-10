const color = {
  WHITE: "#FFFFFF",
  LIGHTBLUE: "#8FC7FF",
  LIGHTBLUE_OPACITY_0_2: "rgba(143, 199, 255, 0.2)",
  BLUE: "#3C91E6",
  DARK_BLUE: "#003061",
  RED: "#FF7575",

  GRADIENT_LIGHTER_BLUE: "#BADCFF",
  GRADIENT_DARKER_BLUE: "#DCEFFF",

  APP_PRIMARY_BACKGROUND_FIRST_GRADIENT: "#FFFFFF", // WHITE
  APP_PRIMARY_BACKGROUND_SECOND_GRADIENT: "#CCE7FF",
  APP_SECONDARY_BACKGROUND: "#516CC9",
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

const listItemHeight = {
  SMALL: dimensions.LIST_ITEM_HEIGHT_SMALL,
  MEDIUM: dimensions.LIST_ITEM_HEIGHT_MEDIUM,
  LARGE: dimensions.LIST_ITEM_HEIGHT_LARGE,
};

export { color, shadow, dimensions, listItemHeight };
