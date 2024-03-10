import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WaterBottleImage from "../../assets/icons/mainwaterbottle.png";

import { MainHeader } from "./MainHeader";
import { HomeWaterBottle } from "./HomeWaterBottle";
import { Statistics } from "./Statistics";
import { TotalIntake } from "./TotalIntake";
import { SettingsButton } from "../components/buttons/SettingsButton";
import { GradientWrapper } from "../components/themes/GradientWrapper";

function RootScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);

  return (
    <GradientWrapper style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.wrapper}>
        <View style={styles.settingsWrapper}>
          <SettingsButton
            onPress={() => navigation.navigate("Settings")}
          ></SettingsButton>
        </View>
        <View style={styles.headerWrapper}>
          <MainHeader></MainHeader>
        </View>
        <View style={styles.totalIntakeWrapper}>
          <TotalIntake></TotalIntake>
        </View>
        <View
          style={[
            /*styles.homeWaterBottleWrapper,*/
            { height: drinkHistory.length > 0 && false ? "40%" : "70%" },
          ]}
        >
          <HomeWaterBottle imgSrc={WaterBottleImage} />
        </View>
        {/* TODO: uncomment statistics */}
        {drinkHistory.length > 0 && false && (
          <View style={styles.statisticsWrapper}>
            <Statistics></Statistics>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </GradientWrapper>
  );
}

export { RootScreen };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    width: "90%",
    left: "5%",
    height: "100%",
  },
  settingsWrapper: {
    height: "10%",
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
  headerWrapper: {
    height: "10%",
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
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  // homeWaterBottleWrapper: {
  // },
  statisticsWrapper: {
    height: "25%",
  },
});
