import { ScreenSize } from "@/enums/ScreenSize";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const { width, height } = window;

let SCREEN_SIZE: ScreenSize;

if (width < 400 && height < 700) {
  SCREEN_SIZE = ScreenSize.Small;
} else if (width < 500 && height < 1000) {
  SCREEN_SIZE = ScreenSize.Medium;
} else {
  SCREEN_SIZE = ScreenSize.Large;
}

export { SCREEN_SIZE };
