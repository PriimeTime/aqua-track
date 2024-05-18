import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const { width, height } = window;

let SCREEN_SIZE;

if (width < 400 && height < 700) {
  SCREEN_SIZE = "SMALL";
} else if (width < 500 && height < 1000) {
  SCREEN_SIZE = "MEDIUM";
} else {
  SCREEN_SIZE = "LARGE";
}

export { SCREEN_SIZE };
