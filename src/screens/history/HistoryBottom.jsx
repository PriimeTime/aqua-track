import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { metricUnitConversion } from "../../utils/helpers";
import { color } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";

const bottomLineBorderTopWidth = {
  SMALL: 1.5,
  MEDIUM: 2,
  LARGE: 3,
};

const bottomLineHeight = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 40,
};

const bottomTextIndent = {
  SMALL: 20,
  MEDIUM: 20,
  LARGE: 50,
};

const fontSizes = {
  SMALL: 18,
  MEDIUM: 24,
  LARGE: 36,
};

function HistoryBottom({ totalDrinkQuantityToday }) {
  return (
    <View>
      <LinearGradient
        colors={[color.GRADIENT_LIGHTER_BLUE, color.GRADIENT_DARKER_BLUE]}
      >
        <View style={styles.bottomLine}></View>
      </LinearGradient>
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>Today's total:</Text>
        <Text style={styles.bottomValue}>
          {metricUnitConversion(totalDrinkQuantityToday)}
        </Text>
      </View>
    </View>
  );
}

export { HistoryBottom };

const styles = StyleSheet.create({
  bottomLine: {
    width: "100%",
    height: bottomLineHeight[SCREEN_SIZE],
    borderTopWidth: bottomLineBorderTopWidth[SCREEN_SIZE],
    borderColor: color.DARK_BLUE,
  },
  bottomSection: {
    width: "90%",
    left: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomText: {
    left: bottomTextIndent[SCREEN_SIZE],
    fontFamily: "Chewy-Regular",
    fontSize: fontSizes[SCREEN_SIZE],
    color: color.DARK_BLUE,
  },
  bottomValue: {
    fontFamily: "Chewy-Regular",
    fontSize: fontSizes[SCREEN_SIZE],
    color: color.DARK_BLUE,
  },
});
