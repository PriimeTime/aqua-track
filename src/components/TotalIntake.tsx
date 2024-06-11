import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { PrimaryText } from "./texts/PrimaryText";
import { StyleSheet, View } from "react-native";
import { color, shadow, SCREEN_SIZE } from "@/utils/constants";
import {
  // totalDrinkQuantity,
  totalHydratingDrinkQuantity,
  displayPositivePercent,
} from "../utils/helpers";
import { CountUp } from "use-count-up";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

const cardSize = {
  SMALL: 3,
  MEDIUM: 5,
  LARGE: 8,
};

const cardPaddingHorizontal = {
  SMALL: 20,
  MEDIUM: 27.5,
  LARGE: 30,
};

const cardPaddingVertical = {
  SMALL: 10,
  MEDIUM: 12.5,
  LARGE: 15,
};

const cardBorderRadius = {
  SMALL: 30,
  MEDIUM: 36,
  LARGE: 72,
};

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
      <PrimaryText size={cardSize[SCREEN_SIZE]} color={color.BLUE}>
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
    paddingHorizontal: cardPaddingHorizontal[SCREEN_SIZE],
    paddingVertical: cardPaddingVertical[SCREEN_SIZE],
    borderRadius: cardBorderRadius[SCREEN_SIZE],
    color: color.BLUE,
    backgroundColor: color.WHITE,
    ...shadow,
  },
});
