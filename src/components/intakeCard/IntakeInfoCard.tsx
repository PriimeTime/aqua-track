import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import { CountUp } from "use-count-up";
import { ms, ScaledSheet } from "react-native-size-matters";

import { PrimaryText } from "@/components/texts";
import { TimeUntilSober } from "@/components/intakeCard/TimeUntilSober";

import { color, FONT_SIZE_34, shadow } from "@/utils/constants";

import {
  // totalDrinkQuantity,
  totalHydratingDrinkQuantity,
  displayPositivePercent,
  calculateCurrentBAC,
  hoursUntilSoberInteger,
  minsUntilSoberInteger,
} from "@/utils/helpers";

import { type DrinkHistoryState } from "@/types/DrinkHistoryState";
import { type UserDataState } from "@/types/store/UserDataState";

import { useTodaysDrinks } from "@/hooks";

function IntakeInfoCard() {
  const drinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );
  // const totalDrinkQuantityToday = totalDrinkQuantity(drinkHistory);
  const todaysDrinks = useTodaysDrinks();
  const hydratingDrinkQuantity = totalHydratingDrinkQuantity(todaysDrinks);

  const { gender, weight, dailyHydrationGoal } = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );

  /**
   * Calculate BAC down to 10 decimals to get
   * as accurately as possible to be able to
   * update minutes left until sober more frequently
   */
  const currentBAC = calculateCurrentBAC(drinkHistory, gender, weight, 10);
  const hrsUntilSober = hoursUntilSoberInteger(currentBAC);
  const minsUntilSober = minsUntilSoberInteger(currentBAC);
  const hydrationLevelInPercent = displayPositivePercent(
    hydratingDrinkQuantity,
    dailyHydrationGoal
  );

  const [currentHydrationLevel, setCurrentHydrationLevel] = useState(
    hydrationLevelInPercent
  );
  const [prevHydrationLevel, setPrevHydrationLevel] = useState(
    hydrationLevelInPercent
  );
  const [currentHrsUntilSober, setCurrentHrsUntilSober] =
    useState(hrsUntilSober);
  const [prevHrsUntilSober, setPrevHrsUntilSober] = useState(hrsUntilSober);
  const [currentMinsUntilSober, setCurrentMinsUntilSober] =
    useState(minsUntilSober);
  const [prevMinsUntilSober, setPrevMinsUntilSober] = useState(minsUntilSober);

  /**
   * Update hydration level and time until sober
   * whenever the IntakeInfoCard component comes into focus
   */
  useFocusEffect(
    useCallback(() => {
      setPrevHydrationLevel(currentHydrationLevel);
      setCurrentHydrationLevel(hydrationLevelInPercent);

      setPrevHrsUntilSober(currentHrsUntilSober);
      setCurrentHrsUntilSober(hrsUntilSober);

      setPrevMinsUntilSober(currentMinsUntilSober);
      setCurrentMinsUntilSober(minsUntilSober);
    }, [hydrationLevelInPercent, hrsUntilSober, minsUntilSober])
  );

  const isTimeUntilSoberVisible = hrsUntilSober > 0 || minsUntilSober > 0;

  return (
    <View style={styles.wrapper}>
      <PrimaryText
        numberOfLines={1}
        fontSize={ms(FONT_SIZE_34)}
        color={color.BLUE}
      >
        {/* {metricUnitConversion(totalDrinkQuantityToday)} */}
        <CountUp
          key={currentHydrationLevel}
          isCounting
          start={prevHydrationLevel}
          end={currentHydrationLevel}
          duration={1} // Duration in seconds
          easing={"easeOutCubic"}
        />
        %
      </PrimaryText>
      {isTimeUntilSoberVisible && (
        <>
          {/**
           * Below pseudo-view needed for space between
           * hydration level and time until sober
           */}
          <View style={{ width: "5%" }}></View>
          <TimeUntilSober
            currentHrsUntilSober={currentHrsUntilSober}
            prevHrsUntilSober={prevHrsUntilSober}
            currentMinsUntilSober={currentMinsUntilSober}
            prevMinsUntilSober={prevMinsUntilSober}
          ></TimeUntilSober>
        </>
      )}
    </View>
  );
}

export { IntakeInfoCard };

const styles = ScaledSheet.create({
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "27@ms",
    paddingVertical: "12.5@ms",
    borderRadius: "36@ms",
    color: color.BLUE,
    backgroundColor: color.WHITE,
    ...shadow,
  },
});
