import { View, StyleSheet, Image, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryText, SecondaryText } from "@/components/texts";
import { InfoCard } from "@/components/cards";
import { HistoryDeleteButton } from "@/components/history/HistoryDeleteButton";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { useGroupedDrinkHistoryQuantity, useTodaysDrinks } from "@/hooks";

import { drinkImageMap } from "@/utils/maps";
import { color, cardBorderWidth, fontFamily } from "@/utils/constants";
import {
  infoCardCurrentAmountHeight,
  infoCardCurrentAmountWidth,
  infoCardCurrentAmountRadius,
  infoCardCurrentAmountFontSize,
  infoCardTotalAmountFontSize,
  infoCardTotalAmountHeight,
  infoCardTotalAmountWidth,
  infoCardTotalAmountRadius,
  infoCardSizeTotalFontSize,
} from "@/utils/constants/components/history";
import {
  getHoursMinutesFromUnixDate,
  metricUnitConversion,
} from "@/utils/helpers";
import { cardBorderRadius } from "@/utils/constants/components/buttons";
import {
  paragraphLargeFontSize,
  paragraphMediumFontSize,
} from "@/utils/constants/components/typography";

function HistoryItem({ item }: { item: DrinkHistoryItem }) {
  const { imageSrc, label: title, date, quantity, typeID } = item;
  const todaysDrinks = useTodaysDrinks();
  const { t } = useTranslation();

  const groupedDrinkHistoryQuantity = useGroupedDrinkHistoryQuantity(
    typeID,
    todaysDrinks
  );

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardImageWrapper}>
        <Image
          style={styles.cardImage}
          source={drinkImageMap[imageSrc]}
        ></Image>
      </View>
      <View style={styles.cardInfoWrapper}>
        <PrimaryText fontSize={paragraphLargeFontSize}>{title}</PrimaryText>
        <SecondaryText fontSize={paragraphMediumFontSize}>
          {getHoursMinutesFromUnixDate(date)}
        </SecondaryText>
      </View>
      <View style={styles.cardTotalWrapper}>
        <View style={styles.cardTotalTop}>
          <InfoCard
            secondary
            height={infoCardCurrentAmountHeight}
            width={infoCardCurrentAmountWidth}
            borderRadius={infoCardCurrentAmountRadius}
            fontSize={infoCardCurrentAmountFontSize}
          >
            {`+${quantity} ${t("unit.millilitersAbbrv")}`}
          </InfoCard>
        </View>
        <View style={styles.cardTotalBottom}>
          <Text style={styles.cardTotalBottomText}>{`${t(
            "history.total"
          )}:`}</Text>
          <InfoCard
            fontSize={infoCardTotalAmountFontSize}
            width={infoCardTotalAmountWidth}
            height={infoCardTotalAmountHeight}
            borderRadius={infoCardTotalAmountRadius}
          >
            {metricUnitConversion(groupedDrinkHistoryQuantity)}
          </InfoCard>
        </View>
      </View>
      <View style={styles.cardDeleteButtonWrapper}>
        <HistoryDeleteButton item={item}></HistoryDeleteButton>
      </View>
    </View>
  );
}

export { HistoryItem };

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: color.WHITE,
    borderColor: color.LIGHTBLUE,
    borderRadius: cardBorderRadius,
    borderWidth: cardBorderWidth,
    height: "90%",
    width: "100%",
    flexDirection: "row",
  },
  cardImageWrapper: {
    height: "100%",
    width: "20%",
  },
  cardImage: {
    width: "80%",
    height: "80%",
    left: "10%",
    top: "10%",
    objectFit: "contain",
  },
  cardInfoWrapper: {
    justifyContent: "center",
    width: "35%",
    height: "100%",
  },
  cardTotalWrapper: {
    width: "30%",
    top: "2.5%",
    height: "80%",
  },
  cardTotalTop: {
    height: "50%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cardTotalBottom: {
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardTotalBottomText: {
    fontFamily: fontFamily.DEFAULT,
    color: color.BLUE,
    marginRight: 5,
    fontSize: infoCardSizeTotalFontSize,
  },
  cardDeleteButtonWrapper: {
    width: "15%",
    height: "100%",
  },
});
