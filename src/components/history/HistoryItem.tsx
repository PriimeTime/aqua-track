import { View, StyleSheet, Image, Text } from "react-native";

import { PrimaryText, SecondaryText } from "@/components/texts";
import { InfoCard } from "@/components/cards";
import { HistoryDeleteButton } from "@/components/history/HistoryDeleteButton";

import { useGroupedDrinkHistoryQuantity } from "@/hooks/useGroupedDrinkHistoryQuantity";

import { type UID } from "@/types/UID";
import { type UnixDate } from "@/types/UnixDate";

import { drinkImageMap } from "@/utils/maps";
import {
  color,
  listItemHeight,
  cardBorderWidth,
  SCREEN_SIZE,
  fontFamily,
} from "@/utils/constants";
import {
  infoCardCurrentAmountHeight,
  infoCardCurrentAmountWidth,
  infoCardCurrentAmountRadius,
  infoCardCurrentAmountFontSize,
  infoCardTotalAmountFontSize,
  infoCardTotalAmountHeight,
  infoCardTotalAmountWidth,
  infoCardTotalAmountRadius,
  historyItemPrimaryTextFontSize,
  historyItemSecondaryTextFontSize,
  historyItemBorderRadius,
  infoCardSizeTotalFontSize,
} from "@/utils/constants/components/history";
import {
  getHoursMinutesFromUnixDate,
  metricUnitConversion,
} from "@/utils/helpers";

interface HistoryItemProps {
  imageSrc: string;
  itemID: UID;
  title: string;
  date: UnixDate;
  quantity: number;
  typeID: number;
}

function HistoryItem({
  imageSrc,
  itemID,
  title,
  date,
  quantity,
  typeID,
}: HistoryItemProps) {
  const groupedDrinkHistoryQuantity = useGroupedDrinkHistoryQuantity(typeID);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardImageWrapper}>
        <Image
          style={styles.cardImage}
          source={drinkImageMap[imageSrc]}
        ></Image>
      </View>
      <View style={styles.cardInfoWrapper}>
        <PrimaryText fontSize={historyItemPrimaryTextFontSize}>
          {title}
        </PrimaryText>
        <SecondaryText fontSize={historyItemSecondaryTextFontSize}>
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
            {`+${quantity} ml`}
          </InfoCard>
        </View>
        <View style={styles.cardTotalBottom}>
          <Text style={styles.cardTotalBottomText}>{`Total:`}</Text>
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
        <HistoryDeleteButton itemID={itemID}></HistoryDeleteButton>
      </View>
    </View>
  );
}

export { HistoryItem };

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: color.WHITE,
    borderColor: color.LIGHTBLUE,
    borderRadius: historyItemBorderRadius,
    borderWidth: cardBorderWidth[SCREEN_SIZE],
    height: listItemHeight[SCREEN_SIZE],
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
