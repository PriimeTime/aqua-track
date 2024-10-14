import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { GradientWrapper } from "@/components/wrappers";
import { CircularLoadingSpinner } from "@/components/loading";

import { paragraphLargeFontSize } from "@/utils/constants/components/typography";
import { startupStyles } from "@/utils/constants";

import { useEffect } from "react";

import { setUserMetrics } from "@/store/userData";

import { calculateDailyHydrationGoalInMl } from "@/utils/helpers";

import { type UserDataState } from "@/types/store/UserDataState";

import { UserMetrics } from "@/models/UserMetrics";

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
      onCompleteStartup();
    }, 7000);

    /** If weight and exercise level are successfully fetched,
     * set the hydration goal, otherwise the fallback value in the store will be used */
    if (weight && exerciseLvl) {
      const dailyHydrationGoalInMl = calculateDailyHydrationGoalInMl(
        weight,
        exerciseLvl
      );

      const updatedMetrics: Partial<UserMetrics> = {
        dailyHydrationGoal: dailyHydrationGoalInMl,
      };
      dispatch(setUserMetrics(updatedMetrics));
    }
  }, []);

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={[startupStyles.wrapper, styles.wrapper]}>
        <PrimaryText fontSize={paragraphLargeFontSize}>
          {t("settings.profile.calcDailyIntake")}
        </PrimaryText>
        <CircularLoadingSpinner />
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
