import { StyleSheet, View, TextInput, Text } from "react-native";
import { SecondaryText } from "../texts/SecondaryText";
import SCREEN_SIZE from "../../utils/screenSize";
import { color } from "../../utils/themes";

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

textFieldHeight = {
  SMALL: 40,
  MEDIUM: 50,
  LARGE: 100,
};

function CustomTextField({ label, keyboardType, maxLength, append }) {
  let textAlign = "auto";

  if (keyboardType === "numeric") {
    textAlign = "center";
  }

  return (
    <>
      {label && (
        <View style={{ width: "25%" }}>
          <SecondaryText size={titleSize[SCREEN_SIZE]} color={color.DARK_BLUE}>
            {label}
          </SecondaryText>
        </View>
      )}
      <View style={styles.textInputWrapper}>
        <TextInput
          style={[
            styles.textInput,
            {
              textAlign,
              width: append ? "75%" : "100%",
            },
          ]}
          keyboardType={keyboardType}
          maxLength={maxLength}
        ></TextInput>
        {append && (
          <View style={styles.appendWrapper}>
            <Text style={styles.append}>{append}</Text>
          </View>
        )}
      </View>
    </>
  );
}

export { CustomTextField };

const styles = StyleSheet.create({
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
    width: "25%",
    height: textFieldHeight[SCREEN_SIZE],
    flexDirection: "row",
    borderRadius: textFieldHeight[SCREEN_SIZE] / 2,
    backgroundColor: color.WHITE,
  },
  textInput: {
    top: "5%",
    height: "90%",
    fontFamily: "Chewy-Regular",
    fontSize: textFontValues[titleSize[SCREEN_SIZE]].fontSize,
    color: color.DARK_BLUE,
  },
});
