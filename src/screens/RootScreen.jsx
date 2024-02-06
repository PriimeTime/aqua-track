import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { MainHeader } from "./MainHeader";
import { HomeWaterBottle } from "./HomeWaterBottle";
import { Statistics } from "./Statistics";
import { TotalIntake } from "./TotalIntake";
import { SettingsButton } from "../components/buttons/SettingsButton";
import { color } from "../utils/themes";

function RootScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);

  return (
    <LinearGradient
      colors={[
        color.APP_PRIMARY_BACKGROUND_FIRST_GRADIENT,
        color.APP_PRIMARY_BACKGROUND_SECOND_GRADIENT,
      ]}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.headerWrapper}>
        <SettingsButton onPress={() => navigation.navigate("settings")}>
          <Ionicons
            color={color.SECONDARY_TEXT}
            size={30}
            name="settings"
          ></Ionicons>
        </SettingsButton>
        <MainHeader></MainHeader>
      </View>
      <View style={styles.totalIntakeWrapper}>
        <TotalIntake></TotalIntake>
      </View>
      <View style={styles.homeWaterBottleWrapper}>
        <HomeWaterBottle />
      </View>
      {drinkHistory.length > 0 && <Statistics />}
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

export { RootScreen };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  headerWrapper: {
    width: "90%",
    left: "5%",
    height: "15%",
    /**
     * Do not use alignItems
     * here, because it would
     * overwrite alignItems
     * in children which is used
     * to position the settings button
     * and the header text
     */
    justifyContent: "center",
  },
  totalIntakeWrapper: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  homeWaterBottleWrapper: {
    width: "90%",
    left: "5%",
    height: "45%",
  },
});
