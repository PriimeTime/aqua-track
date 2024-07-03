import { View, StyleSheet } from "react-native";

import { shadow, color } from "@/utils/constants";
import {
  drinkAmountBottleWidth,
  drinkAmountBottleHeight,
  drinkAmountBorderWidth,
  drinkAmountRadius,
} from "@/utils/constants/components/drinks";

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
    width: drinkAmountBottleWidth,
    height: drinkAmountBottleHeight,
    borderColor: color.DARK_BLUE,
    borderBottomWidth: drinkAmountBorderWidth,
    borderLeftWidth: drinkAmountBorderWidth,
    borderRightWidth: drinkAmountBorderWidth,
    borderTopLeftRadius: drinkAmountBorderWidth,
    borderTopRightRadius: drinkAmountBorderWidth,
    borderBottomRightRadius: drinkAmountRadius,
    borderBottomLeftRadius: drinkAmountRadius,
  },
  liquid: {
    position: "absolute",
    bottom: "2.5%",
    left: "5%",
    width: "90%",
    borderRadius: 8,
  },
});
