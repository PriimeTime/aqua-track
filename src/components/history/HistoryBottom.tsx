import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

import { color, fontFamily } from "@/utils/constants";
import {
  historyBottomFontSize,
  historyBottomLineBorderTopWidth,
  historyBottomLineHeight,
  historyBottomTextIndent,
} from "@/utils/constants/components/history";

import { useDisplayUnits } from "@/hooks";

function HistoryBottom({
  totalDrinkQuantityToday,
}: {
  totalDrinkQuantityToday: number;
}) {
  const { t } = useTranslation();

  const { displayVolumeUnit } = useDisplayUnits();

  return (
    <>
      <LinearGradient
        colors={[color.GRADIENT_LIGHTER_BLUE, color.GRADIENT_DARKER_BLUE]}
      >
        <View style={styles.bottomLine}></View>
      </LinearGradient>
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>{`${t("history.todayTotal")}:`}</Text>
        <Text style={styles.bottomValue}>{`${totalDrinkQuantityToday} ${t(
          displayVolumeUnit()
        )}`}</Text>
      </View>
    </>
  );
}

export { HistoryBottom };

const styles = StyleSheet.create({
  bottomLine: {
    width: "100%",
    height: historyBottomLineHeight,
    borderTopWidth: historyBottomLineBorderTopWidth,
    borderColor: color.DARK_BLUE,
  },
  bottomSection: {
    width: "90%",
    left: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomText: {
    left: historyBottomTextIndent,
    fontFamily: fontFamily.DEFAULT,
    fontSize: historyBottomFontSize,
    color: color.DARK_BLUE,
  },
  bottomValue: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: historyBottomFontSize,
    color: color.DARK_BLUE,
  },
});
