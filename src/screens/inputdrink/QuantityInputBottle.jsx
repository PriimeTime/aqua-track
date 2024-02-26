import { View, StyleSheet } from "react-native";
import { shadow, color } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";

const bottleHeight = {
  SMALL: 275,
  MEDIUM: 380,
  LARGE: 600,
};

const bottleWidth = {
  SMALL: 150,
  MEDIUM: 190,
  LARGE: 300,
};

const borderWidth = {
  SMALL: 10,
  MEDIUM: 12,
  LARGE: 18,
};

const borderRadius = {
  SMALL: 20,
  MEDIUM: 24,
  LARGE: 42,
};

function QuantityInputBottle({ heightVal, liquidColor }) {
  return (
    <View style={styles.glass}>
      <View
        style={[
          styles.glass.liquid,
          { height: `${(heightVal / 100) * 80}%` },
          { backgroundColor: liquidColor },
        ]}
      ></View>
      <View style={styles.glass.light}></View>
    </View>
  );
}

export { QuantityInputBottle };

const styles = StyleSheet.create({
  glass: {
    ...shadow,
    top: 10,
    width: bottleWidth[SCREEN_SIZE],
    height: bottleHeight[SCREEN_SIZE],
    borderColor: color.CUP_COLOR,
    borderBottomWidth: borderWidth[SCREEN_SIZE],
    borderLeftWidth: borderWidth[SCREEN_SIZE],
    borderRightWidth: borderWidth[SCREEN_SIZE],
    borderTopLeftRadius: borderWidth[SCREEN_SIZE],
    borderTopRightRadius: borderWidth[SCREEN_SIZE],
    borderBottomRightRadius: borderRadius[SCREEN_SIZE],
    borderBottomLeftRadius: borderRadius[SCREEN_SIZE],
    liquid: {
      position: "absolute",
      bottom: "2.5%",
      left: "5%",
      width: "90%",
      borderRadius: 8,
    },
  },
});
