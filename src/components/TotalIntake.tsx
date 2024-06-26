import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import { PrimaryText } from "@/components/texts";

import { color, shadow } from "@/utils/constants";
import {
  totalIntakeFontSize,
  totalIntakeCardPadding,
  totalIntakeCardBorderRadius,
} from "@/utils/constants/components/typography";
import {
  // totalDrinkQuantity,
  totalHydratingDrinkQuantity,
  displayPositivePercent,
} from "@/utils/helpers";
import { CountUp } from "use-count-up";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

function TotalIntake() {
  const drinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );
  // const totalDrinkQuantityToday = totalDrinkQuantity(drinkHistory);
  const hydratingDrinkQuantity = totalHydratingDrinkQuantity(drinkHistory);

  const hydrationLevelInPercent = displayPositivePercent(
    hydratingDrinkQuantity,
    2500
  );

  const [currentHydrationLevel, setCurrentHydrationLevel] = useState(
    hydrationLevelInPercent
  );
  const [prevHydrationLevel, setPrevHydrationLevel] = useState(
    hydrationLevelInPercent
  );

  useFocusEffect(
    useCallback(() => {
      setPrevHydrationLevel(currentHydrationLevel);
      setCurrentHydrationLevel(hydrationLevelInPercent);
    }, [hydrationLevelInPercent])
  );

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
    </View>
  );
}

export { TotalIntake };

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: totalIntakeCardPadding.paddingHorizontal,
    paddingVertical: totalIntakeCardPadding.paddingVertical,
    borderRadius: totalIntakeCardBorderRadius,
    color: color.BLUE,
    backgroundColor: color.WHITE,
    ...shadow,
  },
});
