import { StyleSheet, View, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { SettingsButton } from "../components/buttons/SettingsButton";
import { listItemHeight, SCREEN_SIZE } from "../utils/constants";
import { HistoryItem } from "../components/history/HistoryItem";
import { totalDrinkQuantity } from "../utils/helpers";
import { HistoryBottom } from "../components/history/HistoryBottom";
import { GradientWrapper } from "../components/wrappers/GradientWrapper";

function History() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);

  const totalDrinkQuantityToday = totalDrinkQuantity(drinkHistory);

  const historyItemGap = {
    SMALL: 8,
    MEDIUM: 10,
    LARGE: 20,
  };

  return (
    <GradientWrapper style={{ paddingTop: insets.top }}>
      <View style={styles.settingsWrapper}>
        <SettingsButton
          onPress={() => navigation.navigate("Settings")}
        ></SettingsButton>
      </View>
      <View style={styles.tabsWrapper}>
        {/* TODO <Text>placeholder tab bar for history</Text> */}
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: historyItemGap[SCREEN_SIZE] }}
          data={drinkHistory}
          renderItem={({ item }) => (
            <HistoryItem
              imageSrc={item.imageSrc}
              title={item.label}
              time={item.time}
              quantity={item.quantity}
              typeID={item.typeID}
              itemID={item.id}
              hydrationQuantity={item.hydrationQuantity}
            ></HistoryItem>
          )}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: listItemHeight[SCREEN_SIZE],
            offset: listItemHeight[SCREEN_SIZE] * index,
            index,
          })}
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
  settingsWrapper: {
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
