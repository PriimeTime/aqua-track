import waterbottle from "../../assets/icons/drinks/water-bottle.png";
import tea from "../../assets/icons/drinks/tea.png";
import can from "../../assets/icons/drinks/can.png";
import beer from "../../assets/icons/drinks/beer.png";
import winebottle from "../../assets/icons/drinks/wine-bottle.png";
import liquor from "../../assets/icons/drinks/liquor.png";
import coffeecup from "../../assets/icons/drinks/coffee-cup.png";
import energydrink from "../../assets/icons/drinks/energy-drink.png";
import cocktail from "../../assets/icons/drinks/cocktail.png";
import juice from "../../assets/icons/drinks/juice.png";
import milk from "../../assets/icons/drinks/milk.png";

import user from "../../assets/icons/settings/user.png";
import bell from "../../assets/icons/settings/bell.png";
import statistics from "../../assets/icons/settings/statistics.png";
import settings from "../../assets/icons/settings/settings.png";

const settingsImageMap = {
  user,
  bell,
  statistics,
  settings,
};

const settingsList = [
  { id: 1, title: "Profile Settings", imageSrc: "user" },
  { id: 2, title: "Notifications", imageSrc: "bell" },
  { id: 3, title: "Statistics & History", imageSrc: "statistics" },
  { id: 4, title: "App Settings", imageSrc: "settings" },
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
