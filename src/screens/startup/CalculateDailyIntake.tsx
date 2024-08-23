import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryText } from "@/components/texts";
import { GradientWrapper } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
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
      <View style={startupStyles.wrapper}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {"Calculating daily intake..."}
        </PrimaryText>
      </View>
    </GradientWrapper>
  );
}

export { CalculateDailyIntake };
