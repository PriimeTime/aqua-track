import {
  StyleSheet,
  View,
  TextInput,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";

import { SecondaryText } from "@/components/texts";

import { color, fontFamily, inputFieldHeight } from "@/utils/constants";
import {
  customTextFieldFontSize,
  customTextFieldLabelFontSize,
} from "@/utils/constants/components/input";

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
  let keyboardType: CustomTextFieldInputType = CustomTextFieldInputType.Default;
  let textAlign: TextStyle["textAlign"] = "auto";
  let isPassword = false;

  switch (inputType) {
    case undefined || null:
      break;
    case CustomTextFieldInputType.Number:
      textAlign = "center";
      keyboardType = inputType;
      break;
    case CustomTextFieldInputType.Email:
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
          fontSize={customTextFieldLabelFontSize}
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
            styles.textInput,
            {
              textAlign,
              width: append ? "65%" : "90%",
            },
          ]}
          autoCapitalize={
            keyboardType === CustomTextFieldInputType.Email
              ? "none"
              : "sentences"
          }
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
            <Text style={styles.append}>{append}</Text>
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
    fontSize: customTextFieldFontSize,
  },
  textInputWrapper: {
    paddingRight: "2.5%",
    height: inputFieldHeight,
    flexDirection: "row",
    borderRadius: inputFieldHeight / 2,
    justifyContent: "center",
  },
  textInput: {
    height: "100%",
    fontFamily: fontFamily.DEFAULT,
    color: color.DARK_BLUE,
    fontSize: customTextFieldFontSize,
  },
});
