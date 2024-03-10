import waterbottle from "../../assets/icons/drinks/water-bottle-cute.png";
import tea from "../../assets/icons/drinks/tea-cute.png";
import can from "../../assets/icons/drinks/soda-cute.png";
import beer from "../../assets/icons/drinks/beer-cute.png";
import winebottle from "../../assets/icons/drinks/wine-cute.png";
import liquor from "../../assets/icons/drinks/spirit-cute.png";
import coffeecup from "../../assets/icons/drinks/coffee-cute.png";
import energydrink from "../../assets/icons/drinks/energy-drink-cute.png";
import cocktail from "../../assets/icons/drinks/cocktail-cute.png";
import juice from "../../assets/icons/drinks/juice-cute.png";
import milk from "../../assets/icons/drinks/milk-cute.png";

import user from "../../assets/icons/settings/user-cute.png";
import ruler from "../../assets/icons/settings/ruler-cute.png";
import notification from "../../assets/icons/settings/notification-cute.png";
import statistics from "../../assets/icons/settings/statistic-cute.png";
import theme from "../../assets/icons/settings/theme-cute.png";
import language from "../../assets/icons/settings/language-cute.png";
import about from "../../assets/icons/settings/about-cute.png";

const settingsImageMap = {
  user,
  ruler,
  notification,
  statistics,
  theme,
  language,
  about,
};

const settingsList = [
  {
    id: 1,
    title: "Account",
    imageSrc: "user",
    routeName: "AccountSettings",
  },
  {
    id: 2,
    title: "Metrics & Body Measurements",
    imageSrc: "ruler",
    routeName: "ProfileSettings",
  },
  {
    id: 3,
    title: "Notifications",
    imageSrc: "notification",
    routeName: "NotificationsSettings",
  },
  {
    id: 4,
    title: "Statistics & History",
    imageSrc: "statistics",
    routeName: "StatisticsSettings",
  },
  {
    id: 5,
    title: "Theme",
    imageSrc: "theme",
    routeName: "ThemeSettings",
  },
  {
    id: 6,
    title: "Language",
    imageSrc: "language",
    routeName: "LanguageSettings",
  },
  {
    id: 7,
    title: "About",
    imageSrc: "about",
    routeName: "AboutSettings",
  },
];

const drinkImageMap = {
  waterbottle,
  tea,
  can,
  beer,
  winebottle,
  liquor,
  coffeecup,
  energydrink,
  cocktail,
  juice,
  milk,
};

const drinkTypeList = [
  {
    typeID: 1,
    imageSrc: "waterbottle",
    label: "Water",
    drinkType: "normal",
    color: "#3C91E6",
  },
  {
    typeID: 10,
    imageSrc: "juice",
    label: "Juice",
    drinkType: "normal",
    color: "#FFA500",
  },
  {
    typeID: 3,
    imageSrc: "can",
    label: "Soda",
    drinkType: "soda",
    color: "#120001",
  },
  {
    typeID: 4,
    imageSrc: "coffeecup",
    label: "Coffee",
    drinkType: "caffeine",
    color: "#634832",
  },
  {
    typeID: 11,
    imageSrc: "milk",
    label: "Dairy",
    drinkType: "normal",
    color: "#FFF8E7",
  },
  {
    typeID: 2,
    imageSrc: "tea",
    label: "Tea",
    drinkType: "tea",
    color: "#C98258",
  },
  {
    typeID: 8,
    imageSrc: "energydrink",
    label: "Energy Drink",
    drinkType: "caffeine",
    color: "#CCDC2A",
  },
  {
    typeID: 5,
    imageSrc: "beer",
    label: "Beer",
    drinkType: "alcohol_mild",
    color: "#F5A52A",
  },
  {
    typeID: 9,
    imageSrc: "cocktail",
    label: "Cocktail",
    drinkType: "alcohol_mid",
    color: "#FF6347",
  },
  {
    typeID: 6,
    imageSrc: "winebottle",
    label: "Wine",
    drinkType: "alcohol_mid",
    color: "#800020",
  },
  {
    typeID: 7,
    imageSrc: "liquor",
    label: "Spirit",
    drinkType: "alcohol_heavy",
    color: "#B74322",
  },
];

export { drinkTypeList, drinkImageMap, settingsImageMap, settingsList };
