import { StyleSheet, View, TextInput, Text } from "react-native";
import { SecondaryText } from "../texts/SecondaryText";
import SCREEN_SIZE from "../../utils/screenSize";
import { color, inputFieldHeight } from "../../utils/themes";

const textFontValues = {
  1: { fontSize: 12 },
  2: { fontSize: 14 },
  3: { fontSize: 16 },
  4: { fontSize: 18 },
  5: { fontSize: 20 },
  6: { fontSize: 24 },
  7: { fontSize: 36 },
  8: { fontSize: 48 },
};

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

function CustomTextField({
  value,
  handleOnChangeText,
  label,
  inputType,
  maxLength,
  append,
  fullWidth,
  ...props
}) {
  let keyboardType = "default";
  let textAlign = "auto";
  let isPassword = false;

  switch (inputType) {
    case "numeric":
      textAlign = "center";
      keyboardType = inputType;
      break;
    case "password":
      isPassword = true;
      break;
  }

  let textFieldWidth = "50%";

  if (fullWidth) {
    textFieldWidth = "100%";
  }

  return (
    <View style={{ width: textFieldWidth }} {...props}>
      {label && (
        <View style={styles.labelWrapper}>
          <SecondaryText size={titleSize[SCREEN_SIZE]} color={color.DARK_BLUE}>
            {label}
          </SecondaryText>
        </View>
      )}
      <View style={[styles.textInputWrapper, { width: textFieldWidth }]}>
        <TextInput
          style={[
            styles.textInput,
            {
              textAlign,
              width: append ? "65%" : "100%",
            },
          ]}
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          maxLength={maxLength}
          value={value}
          onChangeText={handleOnChangeText}
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
    fontFamily: "Chewy-Regular",
    fontSize: appendFontValues[titleSize[SCREEN_SIZE]].fontSize,
    color: color.DARK_BLUE,
  },
  textInputWrapper: {
    paddingRight: "2.5%",
    paddingLeft: "2.5%",
    height: inputFieldHeight[SCREEN_SIZE],
    flexDirection: "row",
    borderRadius: inputFieldHeight[SCREEN_SIZE] / 2,
    backgroundColor: color.WHITE,
  },
  textInput: {
    height: "100%",
    fontFamily: "Chewy-Regular",
    fontSize: textFontValues[titleSize[SCREEN_SIZE]].fontSize,
    color: color.DARK_BLUE,
  },
});
