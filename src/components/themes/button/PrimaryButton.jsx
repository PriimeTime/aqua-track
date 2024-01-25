import { Pressable, Text, StyleSheet } from "react-native";

function getTextStyle(size) {
  switch (size) {
    case 1:
      return styles.textExtraSmall;
    case 2:
      return styles.textSmall;
    case 3:
      return styles.textMedium;
    case 4:
      return styles.textLarge;
    case 5:
      return styles.textExtraLarge;
    default:
      return styles.textMedium;
  }
}

function getButtonStyle(size) {
  switch (size) {
    case 1:
      return styles.buttonSmall;
    case 2:
      return styles.buttonMedium;
    case 3:
      return styles.buttonLarge;
    default:
      return styles.buttonMedium;
  }
}

function PrimaryButton({ onPress, fontSize, children, buttonSize }) {
  return (
    <Pressable style={getButtonStyle(buttonSize)} onPress={onPress}>
      <Text style={getTextStyle(fontSize)}>{children}</Text>
    </Pressable>
  );
}

export { PrimaryButton };

const styles = StyleSheet.create({
  buttonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#007AFF", // default apple button blue color code
  },
  buttonMedium: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#007AFF", // default apple button blue color code
  },
  buttonLarge: {
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#007AFF", // default apple button blue color code
  },
  textExtraSmall: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 30,
    fontWeight: 400,
    letterSpacing: 1.2,
    color: "white",
  },
  textSmall: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 400,
    letterSpacing: 1.2,
    color: "white",
  },
  textMedium: {
    textAlign: "center",
    fontSize: 25,
    lineHeight: 30,
    fontWeight: 400,
    letterSpacing: 1.2,
    color: "white",
  },
  textLarge: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 400,
    letterSpacing: 1.2,
    color: "white",
  },
  textExtraLarge: {
    textAlign: "center",
    fontSize: 35,
    lineHeight: 30,
    fontWeight: 400,
    letterSpacing: 1.2,
    color: "white",
  },
});
