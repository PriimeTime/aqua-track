import { View, StyleSheet } from "react-native";

import { shadow, color } from "@/utils/constants";
import {
  drinkAmountBorderWidth,
  drinkAmountRadius,
} from "@/utils/constants/components/drinks";
import { ScaledSheet } from "react-native-size-matters";

interface DrinkAmountBottleProps {
  heightVal: number;
  liquidColor: string;
}

function DrinkAmountBottle({ heightVal, liquidColor }: DrinkAmountBottleProps) {
  return (
    <View style={styles.glass}>
      <View
        style={[
          scaledStyles.liquid,
          { height: `${(heightVal / 100) * 90}%` },
          { backgroundColor: liquidColor },
        ]}
      ></View>
    </View>
  );
}

export { DrinkAmountBottle };

const scaledStyles = ScaledSheet.create({
  liquid: {
    position: "absolute",
    bottom: "10@ms",
    left: "5%",
    width: "90%",
    borderRadius: "8@ms",
  },
});

const styles = StyleSheet.create({
  glass: {
    ...shadow,
    width: "60%",
    maxWidth: 400,
    height: "90%",
    borderColor: color.DARK_BLUE,
    borderBottomWidth: drinkAmountBorderWidth,
    borderLeftWidth: drinkAmountBorderWidth,
    borderRightWidth: drinkAmountBorderWidth,
    borderTopLeftRadius: drinkAmountBorderWidth,
    borderTopRightRadius: drinkAmountBorderWidth,
    borderBottomRightRadius: drinkAmountRadius,
    borderBottomLeftRadius: drinkAmountRadius,
  },
});
