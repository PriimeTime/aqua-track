import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { MainHeader } from "@/components/MainHeader";
import { IntakeInfoCard } from "@/components/intakeCard/IntakeInfoCard";
import { SettingsButton } from "@/components/buttons";
import { GradientWrapper } from "@/components/wrappers";
import { PrimaryText } from "@/components/texts";
import { TipCard } from "@/components/cards";

import { Statistics } from "@/screens/Statistics";

import { MainRouteName } from "@/enums/routes/MainRouteName";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { color, ONE_MIN } from "@/utils/constants";
import { getTip } from "@/utils/tipManager";

import { usePeriodicRerender, useTodaysDrinks } from "@/hooks";

function RootScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const drinkHistory = useTodaysDrinks();

  const { t } = useTranslation();

  const [tipString, setTipString] = useState("Hmmm...");

  const handleOnPressTipCard = () => {
    setTipString(getTip());
  };

  useEffect(() => {
    setTipString(getTip());
  }, []);

  /**
   * Rerender component every minute
   * to update time until sober and
   * hydration percent to make sure it's
   * set back to 0% after midnight
   */
  usePeriodicRerender(true, ONE_MIN);

  return (
    <GradientWrapper style={styles.screen}>
      <View style={styles.wrapper}>
        <View style={styles.settingsWrapper}>
          <SettingsButton
            onPress={() => navigation.navigate(MainRouteName.Settings)}
          ></SettingsButton>
        </View>
        <View style={styles.headerWrapper}>
          <MainHeader />
        </View>
        <View style={styles.totalIntakeWrapper}>
          <IntakeInfoCard></IntakeInfoCard>
        </View>
        <View style={styles.contentWrapper}>
          {drinkHistory.length > 0 && <Statistics></Statistics>}
          {drinkHistory.length === 0 && (
            <TipCard onPress={handleOnPressTipCard}>
              <PrimaryText
                color={color.BLUE}
                fontSize={paragraphMediumFontSize}
              >
                {t(tipString)}
              </PrimaryText>
            </TipCard>
          )}
        </View>
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
  contentWrapper: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
