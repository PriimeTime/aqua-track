import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SCREEN_SIZE } from "@/utils/constants";

const waterDropButtonSizeObj = {
  SMALL: hp("12%"),
  MEDIUM: hp("12%"),
  LARGE: hp("15%"),
};

const waterDropButtonSize = waterDropButtonSizeObj[SCREEN_SIZE];

export { waterDropButtonSize };
