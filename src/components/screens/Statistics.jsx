import { View, StyleSheet, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import { shadow } from "../../utils/themes";
import { useSelector } from "react-redux";

function Statistics() {
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const totalDrinkQuantity = useSelector((state) => state.waterIntake.value);

  const widthAndHeight = 180;
  const series = drinkHistory.map((item) => item.quantity);
  const sliceColor = drinkHistory.map((item) => item.color);

  const reducedDrinkHistory = Object.values(
    drinkHistory.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item };
      } else {
        acc[item.id].quantity += item.quantity;
      }
      return acc;
    }, {})
  );

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

  return (
    <View style={styles.wrapper}>
      {series.length > 0 ? (
        <View style={styles.statWrapper}>
          <View style={styles.pieChartWrapper}>
            <PieChart
              style={styles.pieChart}
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.7}
              coverFill={false}
            />
          </View>
          <View style={styles.legendWrapper}>
            {drinkHistoryWithPercentages.map((item) => (
              <View key={item.id.toString()} style={styles.legendItemWrapper}>
                <View style={styles.legendItemColorWrapper}>
                  <View
                    style={[
                      styles.legendItemColor,
                      { borderColor: item.color },
                    ]}
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
      ) : (
        <View style={styles.emptyStatWrapper}>
          <Text>no data</Text>
        </View>
      )}
    </View>
  );
}

export { Statistics };

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    left: "5%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  statWrapper: {
    height: "100%",
    width: "100%",
  },
  emptyStatWrapper: {
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  pieChartWrapper: {
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  pieChart: {
    ...shadow.slight_shadow,
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
    ...shadow.moderate_shadow,
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
