import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { SCREEN_SIZE } from "@/utils/constants";

const backButtonfontSizes = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 40,
};

const backButtonDimensions = {
  SMALL: { width: 85, height: 48, borderRadius: 24 },
  MEDIUM: { width: 110, height: 60, borderRadius: 30 },
  LARGE: { width: 170, height: 90, borderRadius: 45 },
};

const backButtonTextStyle = (styles: StyleProp<TextStyle>) => ({
  ...(styles as object),
  fontSize: backButtonfontSizes[SCREEN_SIZE],
});

const backButtonStyle = (styles: StyleProp<ViewStyle>) => ({
  ...(styles as object),
  width: backButtonDimensions[SCREEN_SIZE].width,
  height: backButtonDimensions[SCREEN_SIZE].height,
  borderRadius: backButtonDimensions[SCREEN_SIZE].borderRadius,
});

export {
  backButtonfontSizes,
  backButtonDimensions,
  backButtonTextStyle,
  backButtonStyle,
};
