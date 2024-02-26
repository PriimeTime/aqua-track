import { View, StyleSheet, Text } from "react-native";
import { VictoryPie } from "victory-native";
import { shadow } from "../utils/themes";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function Statistics() {
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const totalDrinkQuantity = drinkHistory.reduce(
    (acc, val) => acc + val.quantity,
    0
  );
  const pieDimensions = 250;

  const reducedDrinkHistory = Object.values(
    drinkHistory.reduce((acc, item) => {
      if (!acc[item.typeID]) {
        acc[item.typeID] = { ...item };
      } else {
        acc[item.typeID].quantity += item.quantity;
      }
      return acc;
    }, {})
  );

  const sliceColor = reducedDrinkHistory.map((item) => item.color);
  const pieValues = reducedDrinkHistory.map((item) => item.quantity);

  /**
   * Add percentage property to drink history
   * to be able to loop through it too when
   * displaying statistics
   *
   * Then sort it descending by percentage
   */
  const drinkHistoryWithPercentages = reducedDrinkHistory
    .map((item) => {
      return { ...item, percent: (item.quantity / totalDrinkQuantity) * 100 };
    })
    .sort((a, b) => b.percent - a.percent);

  /**
   * Define default and wanted
   * values so the pie can animate
   * rising from 0 to 100 values
   */
  const defaultGraphicData = pieValues.map((item, index) => {
    /**
     * Set the y value of the last
     * object in the array to 100,
     * so that by default the pie
     * is one colored, and entirely
     * taken up by 1 item
     */
    if (index < pieValues.length - 1) {
      return { y: 0 };
    }
    return { x: " ", y: 100 };
  });

  const wantedGraphicData = pieValues.map((item) => {
    return { x: " ", y: item };
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
          padAngle={5}
          animate={{ easing: "exp" }}
          data={graphicData}
          width={pieDimensions}
          height={pieDimensions}
          colorScale={sliceColor}
          innerRadius={50}
        />
      </View>
      <View style={styles.legendWrapper}>
        {drinkHistoryWithPercentages.map((item) => (
          <View key={item.typeID} style={styles.legendItemWrapper}>
            <View style={styles.legendItemColorWrapper}>
              <View
                style={[styles.legendItemColor, { borderColor: item.color }]}
              ></View>
            </View>
            <View style={styles.legendItemLabel}>
              <Text>
                {Math.round(item.percent)} % {item.label}
              </Text>
            </View>
          </View>
        ))}
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
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  pieChart: {
    ...shadow,
  },
  legendWrapper: {
    flexDirection: "row", // Align children horizontally
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center", // Aligns wrapped lines
    width: "100%",
    height: "25%",
  },
  legendItemWrapper: {
    ...shadow,
    alignContent: "center",
    flexWrap: "wrap",
    width: "33.33%",
    height: "25%",
  },
  legendItemColorWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    height: "100%",
  },
  legendItemColor: {
    width: 0,
    height: 0,
    borderWidth: 6,
    borderRadius: 180,
  },
  legendItemLabel: {
    marginLeft: "5%",
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "left",
  },
});
