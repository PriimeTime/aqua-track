import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import WaterBottleImage from "../../assets/icons/mainwaterbottle.png";

import { MainHeader } from "@/components/MainHeader";
import { HomeWaterBottle } from "@/components/HomeWaterBottle";
import { TotalIntake } from "@/components/TotalIntake";
import { SettingsButton } from "@/components/buttons";
import { GradientWrapper } from "@/components/wrappers";

import { Statistics } from "@/screens/Statistics";

import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

import { MainRouteName } from "@/enums/routes/MainRouteName";

function RootScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const drinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );

  return (
    <GradientWrapper style={styles.screen}>
      <View style={styles.wrapper}>
        <View style={styles.settingsWrapper}>
          <SettingsButton
            onPress={() => navigation.navigate(MainRouteName.Settings)}
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
  screen: {
    flex: 1,
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
