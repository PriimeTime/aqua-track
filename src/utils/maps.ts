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
import { SettingsRouteName } from "@/enums/routes/SettingsRouteName";
import { DrinkImage } from "@/enums/maps/DrinkImage";
import { DrinkType } from "@/enums/maps/DrinkType";
import { ImageSourcePropType } from "react-native";

const settingsImageMap: { [key: string]: ImageSourcePropType } = {
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
    id: "1",
    title: "Account",
    imageSrc: "user",
    routeName: SettingsRouteName.AccountSettings,
  },
  {
    id: "2",
    title: "Metrics & Body Measurements",
    imageSrc: "ruler",
    routeName: SettingsRouteName.ProfileSettings,
  },
  {
    id: "3",
    title: "Notifications",
    imageSrc: "notification",
    routeName: SettingsRouteName.NotificationsSettings,
  },
  {
    id: "4",
    title: "Statistics & History",
    imageSrc: "statistics",
    routeName: SettingsRouteName.StatisticsSettings,
  },
  {
    id: "5",
    title: "Theme",
    imageSrc: "theme",
    routeName: SettingsRouteName.ThemeSettings,
  },
  {
    id: "6",
    title: "Language",
    imageSrc: "language",
    routeName: SettingsRouteName.LanguageSettings,
  },
  {
    id: "7",
    title: "About",
    imageSrc: "about",
    routeName: SettingsRouteName.AboutSettings,
  },
];

const drinkImageMap: { [key: string]: ImageSourcePropType } = {
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
    imageSrc: DrinkImage.Water,
    label: "Water",
    drinkType: DrinkType.Normal,
    color: "#3C91E6",
  },
  {
    typeID: 10,
    imageSrc: DrinkImage.Juice,
    label: "Juice",
    drinkType: DrinkType.Normal,
    color: "#F5882A",
  },
  {
    typeID: 3,
    imageSrc: DrinkImage.Can,
    label: "Soda",
    drinkType: DrinkType.Soda,
    color: "#120001",
  },
  {
    typeID: 4,
    imageSrc: DrinkImage.Coffee,
    label: "Coffee",
    drinkType: DrinkType.Caffeine,
    color: "#634832",
  },
  {
    typeID: 11,
    imageSrc: DrinkImage.Milk,
    label: "Dairy",
    drinkType: DrinkType.Normal,
    color: "#FFFAF5",
  },
  {
    typeID: 2,
    imageSrc: DrinkImage.Tea,
    label: "Tea",
    drinkType: DrinkType.Tea,
    color: "#C98258",
  },
  {
    typeID: 8,
    imageSrc: DrinkImage.EnergyDrink,
    label: "Energy Drink",
    drinkType: DrinkType.Caffeine,
    color: "#CCDC2A",
  },
  {
    typeID: 5,
    imageSrc: DrinkImage.Beer,
    label: "Beer",
    drinkType: DrinkType.MildAlcohol,
    color: "#F5A52A",
  },
  {
    typeID: 9,
    imageSrc: DrinkImage.Cocktail,
    label: "Cocktail",
    drinkType: DrinkType.MediumAlcohol,
    color: "#2ADBB5",
  },
  {
    typeID: 6,
    imageSrc: DrinkImage.Wine,
    label: "Wine",
    drinkType: DrinkType.MediumAlcohol,
    color: "#800020",
  },
  {
    typeID: 7,
    imageSrc: DrinkImage.Liquor,
    label: "Spirit",
    drinkType: DrinkType.HeavyAlcohol,
    color: "#B74322",
  },
];

export { drinkTypeList, drinkImageMap, settingsImageMap, settingsList };
