import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { MainHeader } from "./MainHeader";
import { HomeWaterBottle } from "./HomeWaterBottle";
import { Statistics } from "./Statistics";
import { color } from "../utils/themes";

function RootScreen() {
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MainHeader></MainHeader>
      <HomeWaterBottle />
      {drinkHistory.length > 0 && <Statistics />}
      <StatusBar style="auto" />
    </View>
  );
}

export { RootScreen };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
  },
});
