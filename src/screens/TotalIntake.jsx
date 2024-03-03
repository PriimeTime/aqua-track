import { useSelector } from "react-redux";
import { PrimaryText } from "../components/texts/PrimaryText";
import { StyleSheet, View, Text } from "react-native";
import { color, shadow } from "../utils/themes";
import SCREEN_SIZE from "../utils/screenSize";
import {
  metricUnitConversion,
  totalDrinkQuantity,
  totalHydratingDrinkQuantity,
  displayPositivePercent,
} from "../utils/helpers.js";
import { CountUp } from "use-count-up";

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
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const totalDrinkQuantityToday = totalDrinkQuantity(drinkHistory);
  const hydratingDrinkQuantity = totalHydratingDrinkQuantity(drinkHistory);

  const hydrationLevelInPercent = displayPositivePercent(
    hydratingDrinkQuantity,
    2500
  );

  return (
    <View style={styles.wrapper}>
      <PrimaryText size={cardSize[SCREEN_SIZE]} color={color.BLUE}>
        {/* {metricUnitConversion(totalDrinkQuantityToday)} */}
        {/* TODO change hard coded 2500ml to dynamic value */}
        {/* TODO if % changed, trigger countup from prevVal
        to nextVal!!! */}
        <CountUp
          isCounting
          end={hydrationLevelInPercent}
          duration={1}
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: cardBorderRadius[SCREEN_SIZE],
    color: color.BLUE,
    backgroundColor: color.WHITE,
    ...shadow,
  },
});
