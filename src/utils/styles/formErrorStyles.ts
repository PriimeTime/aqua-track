import { StyleSheet } from "react-native";

import { registerFormErrorFontSize } from "@/utils/constants/components/forms";
import { color, fontFamily } from "@/utils/constants";

const formErrorStyles = StyleSheet.create({
  errorWrapper: {
    justifyContent: "center",
    height: registerFormErrorFontSize * 1.5,
  },
  errorText: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: registerFormErrorFontSize,
    color: color.RED,
  },
});

export { formErrorStyles };
