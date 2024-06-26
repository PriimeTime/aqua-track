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
  getHoursMinutesFromUnixDate,
  metricUnitConversion,
} from "@/utils/helpers";

const itemBorderRadius = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 25,
};

const infoCardSizeCurrentAmount = {
  SMALL: 3,
  MEDIUM: 4,
  LARGE: 6,
};

const infoCardSizeTotalAmount = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 4,
};

const infoCardSizeTotalFontSize = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 26,
};

const drinkTitleSize = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 7,
};

const drinkTimeSize = {
  SMALL: 2,
  MEDIUM: 3,
  LARGE: 6,
};

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
        <PrimaryText size={drinkTitleSize[SCREEN_SIZE]}>{title}</PrimaryText>
        <SecondaryText size={drinkTimeSize[SCREEN_SIZE]}>
          {getHoursMinutesFromUnixDate(date)}
        </SecondaryText>
      </View>
      <View style={styles.cardTotalWrapper}>
        <View style={styles.cardTotalTop}>
          <InfoCard secondary size={infoCardSizeCurrentAmount[SCREEN_SIZE]}>
            {`+${quantity} ml`}
          </InfoCard>
        </View>
        <View style={styles.cardTotalBottom}>
          <Text style={styles.cardTotalBottomText}>{`Total:`}</Text>
          <InfoCard size={infoCardSizeTotalAmount[SCREEN_SIZE]}>
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
    borderRadius: itemBorderRadius[SCREEN_SIZE],
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
    fontSize: infoCardSizeTotalFontSize[SCREEN_SIZE],
  },
  cardDeleteButtonWrapper: {
    width: "15%",
    height: "100%",
  },
});
