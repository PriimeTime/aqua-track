import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { GradientWrapper } from "@/components/wrappers";

import { paragraphLargeFontSize } from "@/utils/constants/components/typography";
import { startupStyles } from "@/utils/constants";

import { useEffect } from "react";

import { setDailyHydrationGoal } from "@/store/userData";

import { calculateDailyHydrationGoalInMl } from "@/utils/helpers";

import { type UserDataState } from "@/types/store/UserDataState";

interface CalculateDailyIntakeProps {
  onCompleteStartup: () => void;
}

function CalculateDailyIntake({
  onCompleteStartup,
}: CalculateDailyIntakeProps) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );

  const { weight, exerciseLvl } = userMetrics;

  useEffect(() => {
    setTimeout(() => {
      // TODO: play some animation
      onCompleteStartup();
    }, 7000);

    /** If weight and exercise level are successfully fetched,
     * set the hydration goal, otherwise the fallback value in the store will be used */
    if (weight && exerciseLvl) {
      const dailyHydrationGoalInMl = calculateDailyHydrationGoalInMl(
        weight,
        exerciseLvl
      );
      dispatch(setDailyHydrationGoal(dailyHydrationGoalInMl));
    }
  }, []);

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={[startupStyles.wrapper, styles.wrapper]}>
        <PrimaryText fontSize={paragraphLargeFontSize}>
          {t("settings.profile.calcDailyIntake")}
        </PrimaryText>
      </View>
    </GradientWrapper>
  );
}

export { CalculateDailyIntake };

const styles = StyleSheet.create({
  wrapper: {
    width: "75%",
    left: "12.5%",
    top: "15%",
  },
});
