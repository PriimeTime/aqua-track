import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { ms } from "react-native-size-matters";

import { FONT_SIZE_22 } from "@/utils/constants";

const backButtonTextStyle = (styles: StyleProp<TextStyle>) => ({
  ...(styles as ViewStyle),
  fontSize: FONT_SIZE_22,
});

const backButtonStyle = (styles: StyleProp<ViewStyle>) => ({
  ...(styles as ViewStyle),
  width: ms(85),
  height: ms(50),
  borderRadius: ms(25),
});

export { backButtonTextStyle, backButtonStyle };
