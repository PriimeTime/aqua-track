import waterbottle from "../../assets/icons/drinks/water-bottle.png";
import tea from "../../assets/icons/drinks/tea.png";
import can from "../../assets/icons/drinks/can.png";
import beer from "../../assets/icons/drinks/beer.png";
import winebottle from "../../assets/icons/drinks/wine-bottle.png";
import liquor from "../../assets/icons/drinks/liquor.png";
import coffeecup from "../../assets/icons/drinks/coffee-cup.png";
import energydrink from "../../assets/icons/drinks/energy-drink.png";

const drinkImageMap = {
  waterbottle,
  tea,
  can,
  beer,
  winebottle,
  liquor,
  coffeecup,
  energydrink,
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
    typeID: 2,
    imageSrc: "tea",
    label: "Tea",
    drinkType: "herb",
    color: "#C98258",
  },
  {
    typeID: 3,
    imageSrc: "can",
    label: "Soda",
    drinkType: "normal",
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
    typeID: 5,
    imageSrc: "beer",
    label: "Beer",
    drinkType: "alcohol",
    color: "#F5A52A",
  },
  {
    typeID: 6,
    imageSrc: "winebottle",
    label: "Wine",
    drinkType: "liquor",
    color: "#800020",
  },
  {
    typeID: 7,
    imageSrc: "liquor",
    label: "Spirit",
    drinkType: "spirit",
    color: "#B74322",
  },
  {
    typeID: 8,
    imageSrc: "energydrink",
    label: "Energy Drink",
    drinkType: "caffeine",
    color: "#CCDC2A",
  },
];

export { drinkTypeList, drinkImageMap };
