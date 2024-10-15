import { View, StyleSheet } from "react-native";
import { VictoryPie } from "victory-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { t } from "i18next";

import { color } from "@/utils/constants";
import { formatNumber, totalDrinkQuantity } from "@/utils/helpers";
import { paragraphVerySmallFontSize } from "@/utils/constants/components/typography";
import {
  pieCornerRadius,
  pieDimensions,
  pieInnerRadius,
  pieLabelRadius,
} from "@/utils/constants/components/pieChart";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";
import { useTodaysDrinks } from "@/hooks";

function Statistics() {
  const drinkHistory = useTodaysDrinks();

  const reducedDrinkHistory: DrinkHistoryItem[] = Object.values(
    drinkHistory.reduce<Record<number, DrinkHistoryItem>>((acc, item) => {
      const existingItem = acc[item.typeID];
      if (!existingItem) {
        acc[item.typeID] = { ...item };
      } else {
        existingItem.quantity += item.quantity;
      }
      return acc;
    }, {})
  );

  const sliceColor = reducedDrinkHistory.map((item) => item.color);

  /**
   * Prepare the data for the pie chart, including labels.
   */
  const wantedGraphicData = reducedDrinkHistory.map((item) => {
    return {
      x: t(item.label), // Use the translated label
      y: (item.quantity / totalDrinkQuantity(drinkHistory)) * 100,
    };
  });

  /**
   * Define default values so the pie can animate
   * rising from 0 to actual values.
   */
  const defaultGraphicData = wantedGraphicData.map((item, index) => {
    if (index < wantedGraphicData.length - 1) {
      return { ...item, y: 0 };
    }
    return { ...item, y: totalDrinkQuantity(drinkHistory) };
  });

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useFocusEffect(
    useCallback(() => {
      setGraphicData(defaultGraphicData);
      const timeoutId = setTimeout(() => {
        setGraphicData(wantedGraphicData);
      }, 1);
      return () => clearTimeout(timeoutId);
    }, [drinkHistory])
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.pieChartWrapper}>
        <VictoryPie
          padAngle={10}
          animate={{ easing: "exp", duration: 150 }}
          data={graphicData}
          width={pieDimensions}
          height={pieDimensions}
          colorScale={sliceColor}
          innerRadius={pieInnerRadius}
          labelRadius={pieLabelRadius}
          cornerRadius={pieCornerRadius}
          labels={({ datum }) => `${formatNumber(datum.y)}% ${datum.x}`}
          style={{
            labels: {
              fontFamily: "Chewy-Regular",
              fill: color.DARK_BLUE,
              fontSize: paragraphVerySmallFontSize,
              padding: 16,
            },
          }}
        />
      </View>
    </View>
  );
}

export { Statistics };

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pieChartWrapper: {
    width: "100%",
    height: "100%", // Adjusted to occupy full height since legend is removed
    justifyContent: "center",
    alignItems: "center",
  },
});
