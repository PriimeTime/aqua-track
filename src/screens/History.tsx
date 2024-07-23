import { StyleSheet, View, FlatList } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SettingsButton } from "@/components/buttons";
import { HistoryItem, HistoryBottom } from "@/components/history";
import { GradientWrapper } from "@/components/wrappers";

import { MainRouteName } from "@/enums/routes/MainRouteName";

import { totalDrinkQuantity } from "@/utils/helpers";
import { historyItemGap } from "@/utils/constants/components/history";
import { ONE_MIN } from "@/utils/constants";

import { usePeriodicRerender, useTodaysDrinks } from "@/hooks";
import { PrimaryText } from "@/components/texts";
import { headerFontSize } from "@/utils/constants/components/typography";

function History() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const drinkHistory = useTodaysDrinks();

  const totalDrinkQuantityToday = totalDrinkQuantity(drinkHistory);

  const condition = drinkHistory.length > 0;
  const interval = ONE_MIN;
  usePeriodicRerender(condition, interval);

  return (
    <GradientWrapper style={styles.wrapper}>
      <View style={styles.settingsButtonWrapper}>
        <SettingsButton
          onPress={() => navigation.navigate(MainRouteName.Settings)}
        ></SettingsButton>
      </View>
      <View style={styles.tabsWrapper}>
        <PrimaryText fontSize={headerFontSize}>{"History"}</PrimaryText>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: historyItemGap }}
          data={drinkHistory}
          renderItem={({ item }) => (
            <HistoryItem
              item={item}
              // hydrationQuantity={item.hydrationQuantity}
            ></HistoryItem>
          )}
          // getItemLayout={(_, index) => ({
          //   length: listItemHeight[SCREEN_SIZE],
          //   offset: listItemHeight[SCREEN_SIZE] * index,
          //   index,
          // })}
          /* Below line is needed to create
            an artificial gap between the
            HistoryBottom component and the
            bottom of the FlatList */
          ListFooterComponent={<View />}
        ></FlatList>
      </View>
      <View style={styles.bottomWrapper}>
        <HistoryBottom
          totalDrinkQuantityToday={totalDrinkQuantityToday}
        ></HistoryBottom>
      </View>
    </GradientWrapper>
  );
}

export { History };

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  settingsButtonWrapper: {
    width: "90%",
    left: "5%",
    height: "10%",
    /**
     * Do not use alignItems
     * here, because it would
     * overwrite alignItems
     * in children which is used
     * to position the settings button
     * and the header text
     */
    justifyContent: "center",
  },
  tabsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  listWrapper: {
    width: "90%",
    left: "5%",
    height: "55%",
  },
  bottomWrapper: {
    height: "25%",
  },
});
