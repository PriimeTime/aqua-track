import {
  StyleSheet,
  View,
  TextInput,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";

import { SecondaryText } from "@/components/texts";

import {
  SCREEN_SIZE,
  color,
  fontFamily,
  getFontSizeForScreen,
  inputFieldHeight,
  inputFontSizeValues,
} from "@/utils/constants";

const appendFontValues = {
  1: { fontSize: 9 },
  2: { fontSize: 11 },
  3: { fontSize: 13 },
  4: { fontSize: 15 },
  5: { fontSize: 17 },
  6: { fontSize: 20 },
  7: { fontSize: 26 },
  8: { fontSize: 30 },
};

const titleSize = {
  SMALL: 4,
  MEDIUM: 6,
  LARGE: 8,
};

const getAppendStyle = () => ({
  fontSize: getFontSizeForScreen(appendFontValues, SCREEN_SIZE, titleSize),
  ...styles.append,
});

const getTextInputStyle = () => ({
  fontSize: getFontSizeForScreen(inputFontSizeValues, SCREEN_SIZE, titleSize),
  ...styles.textInput,
});

interface CustomTextFieldProps {
  value: string;
  handleOnChangeText?: (input: string) => void;
  handleOnBlur?: () => void;
  handleOnFocus?: () => void;
  label: string;
  customStyles?: StyleProp<ViewStyle>;
  readOnly?: boolean;
  inputType?: CustomTextFieldInputType;
  maxLength?: number;
  append?: string;
  fullWidth?: boolean;
}

function CustomTextField({
  value,
  handleOnChangeText,
  handleOnBlur,
  handleOnFocus,
  label,
  customStyles,
  readOnly,
  inputType,
  maxLength,
  append,
  fullWidth,
  ...props
}: CustomTextFieldProps) {
  let keyboardType: KeyboardTypeOptions = CustomTextFieldInputType.Default;
  let textAlign: TextStyle["textAlign"] = "auto";
  let isPassword = false;

  switch (inputType) {
    case CustomTextFieldInputType.Number:
      textAlign = "center";
      keyboardType = inputType;
      break;
    case CustomTextFieldInputType.Password:
      isPassword = true;
      break;
  }

  let textFieldWidth = "50%";

  if (fullWidth) {
    textFieldWidth = "100%";
  }

  return (
    <View
      style={[
        {
          width: textFieldWidth,
        } as StyleProp<ViewStyle>,
        customStyles,
      ]}
      {...props}
    >
      <View style={styles.labelWrapper}>
        <SecondaryText
          size={titleSize[SCREEN_SIZE]}
          color={readOnly ? color.BLUE : color.DARK_BLUE}
        >
          {label}
        </SecondaryText>
      </View>
      <View
        style={[
          styles.textInputWrapper,
          {
            paddingLeft: readOnly ? "0%" : "2.5%",
            backgroundColor: readOnly ? "" : color.WHITE,
            width: textFieldWidth,
          } as StyleProp<ViewStyle>,
        ]}
      >
        <TextInput
          style={[
            getTextInputStyle(),
            {
              textAlign,
              width: append ? "65%" : "90%",
            },
          ]}
          readOnly={readOnly ?? false}
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          maxLength={maxLength}
          value={value}
          onChangeText={handleOnChangeText}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        ></TextInput>
        {append && (
          <View style={styles.appendWrapper}>
            <Text style={getAppendStyle()}>{append}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export { CustomTextField };

const styles = StyleSheet.create({
  labelWrapper: {
    width: "50%",
    marginBottom: "2.5%",
  },
  appendWrapper: {
    height: "100%",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  append: {
    textAlign: "center",
    fontFamily: fontFamily.DEFAULT,
    color: color.DARK_BLUE,
  },
  textInputWrapper: {
    paddingRight: "2.5%",
    height: inputFieldHeight[SCREEN_SIZE],
    flexDirection: "row",
    borderRadius: inputFieldHeight[SCREEN_SIZE] / 2,
    justifyContent: "center",
  },
  textInput: {
    height: "100%",
    fontFamily: fontFamily.DEFAULT,
    color: color.DARK_BLUE,
  },
});
