const color = {
  PRIMARY_BUTTON: "#007AFF",
  PRIMARY_BUTTON_PRESSED: "#0056B3",

  CARD_BUTTON_BORDER: "#003061",
  CARD_BUTTON_PRESSED: "#000000",
  CARD_BUTTON_BACKGROUND: "#FFFFFF",

  SECONDARY_BUTTON: "#FFFFFF",

  PRIMARY_TEXT: "#003061",
  SECONDARY_TEXT: "#3C91E6",
  TERTIARY_TEXT: "#8FC7FF",

  APP_PRIMARY_BACKGROUND_FIRST_GRADIENT: "#FFFFFF",
  APP_PRIMARY_BACKGROUND_SECOND_GRADIENT: "#CCE7FF",
  APP_SECONDARY_BACKGROUND: "#516CC9",
};

const shadow = {
  very_slight_shadow: {
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  slight_shadow: {
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  moderate_shadow: {
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  strong_shadow: {
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
  shadow: {
    shadowColor: color.SECONDARY_TEXT,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
};

export { color, shadow };
