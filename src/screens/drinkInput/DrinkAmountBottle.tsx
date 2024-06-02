import { View, StyleSheet } from "react-native";
import { shadow, color, SCREEN_SIZE } from "../../utils/constants";

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

interface DrinkAmountBottleProps {
  heightVal: number;
  liquidColor: string;
}

function DrinkAmountBottle({ heightVal, liquidColor }: DrinkAmountBottleProps) {
  return (
    <View style={styles.glass}>
      <View
        style={[
          styles.liquid,
          { height: `${(heightVal / 100) * 80}%` },
          { backgroundColor: liquidColor },
        ]}
      ></View>
    </View>
  );
}

export { DrinkAmountBottle };

const styles = StyleSheet.create({
  glass: {
    ...shadow,
    top: 10,
    width: bottleWidth[SCREEN_SIZE],
    height: bottleHeight[SCREEN_SIZE],
    borderColor: color.DARK_BLUE,
    borderBottomWidth: borderWidth[SCREEN_SIZE],
    borderLeftWidth: borderWidth[SCREEN_SIZE],
    borderRightWidth: borderWidth[SCREEN_SIZE],
    borderTopLeftRadius: borderWidth[SCREEN_SIZE],
    borderTopRightRadius: borderWidth[SCREEN_SIZE],
    borderBottomRightRadius: borderRadius[SCREEN_SIZE],
    borderBottomLeftRadius: borderRadius[SCREEN_SIZE],
  },
  liquid: {
    position: "absolute",
    bottom: "2.5%",
    left: "5%",
    width: "90%",
    borderRadius: 8,
  },
});
