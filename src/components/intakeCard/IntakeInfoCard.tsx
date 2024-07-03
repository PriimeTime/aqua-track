import { useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { CountUp } from "use-count-up";

import { PrimaryText } from "@/components/texts";
import { TimeUntilSober } from "@/components/intakeCard/TimeUntilSober";

import { MS_PER_SEC, SEC_PER_MIN, color, shadow } from "@/utils/constants";
import {
  totalIntakeFontSize,
  totalIntakeCardPadding,
  totalIntakeCardBorderRadius,
} from "@/utils/constants/components/typography";
import {
  // totalDrinkQuantity,
  totalHydratingDrinkQuantity,
  displayPositivePercent,
  calculateCurrentBAC,
  hoursUntilSoberInteger,
  minsUntilSoberInteger,
} from "@/utils/helpers";

import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

function IntakeInfoCard() {
  const drinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );
  // const totalDrinkQuantityToday = totalDrinkQuantity(drinkHistory);
  const hydratingDrinkQuantity = totalHydratingDrinkQuantity(drinkHistory);

  /**
   * Calculate BAC down to 10 decimals to get
   * as accurately as possible to be able to
   * update minutes left until sober more frequently
   */
  const currentBAC = calculateCurrentBAC(drinkHistory, 10);
  const hrsUntilSober = hoursUntilSoberInteger(currentBAC);
  const minsUntilSober = minsUntilSoberInteger(currentBAC);
  const hydrationLevelInPercent = displayPositivePercent(
    hydratingDrinkQuantity,
    2500
  );

  const [_, setTime] = useState(Date.now());

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
   * whenever the IntakeInfoCard component comes into focus.
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

  /**
   * If user is currently under the influence,
   * rerender component every minute
   * to update time until sober
   */
  useEffect(() => {
    if (currentBAC === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTime(Date.now());
    }, SEC_PER_MIN * MS_PER_SEC);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <PrimaryText fontSize={totalIntakeFontSize} color={color.BLUE}>
        {/* {metricUnitConversion(totalDrinkQuantityToday)} */}
        {/* TODO change hard coded 2500ml to dynamic value */}
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

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: totalIntakeCardPadding.paddingHorizontal,
    paddingVertical: totalIntakeCardPadding.paddingVertical,
    borderRadius: totalIntakeCardBorderRadius,
    color: color.BLUE,
    backgroundColor: color.WHITE,
    ...shadow,
  },
});
