import { StyleSheet, View, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { SettingsButton } from "../../components/buttons/SettingsButton";
import { resetHistory } from "../../store/store";
import { color, dimensions } from "../../utils/themes";
import { HistoryItem } from "./HistoryItem";
import { totalDrinkQuantity } from "../../utils/helpers";
import SCREEN_SIZE from "../../utils/screenSize";
import { HistoryBottom } from "./HistoryBottom";

function History() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const dispatch = useDispatch();

  const totalDrinkQuantityToday = totalDrinkQuantity(drinkHistory);

  const historyItemGap = {
    SMALL: 8,
    MEDIUM: 10,
    LARGE: 20,
  };

  const listItemHeight = {
    SMALL: dimensions.LIST_ITEM_HEIGHT_SMALL,
    MEDIUM: dimensions.LIST_ITEM_HEIGHT_MEDIUM,
    LARGE: dimensions.LIST_ITEM_HEIGHT_LARGE,
  };

  const handleOnPress = () => {
    dispatch(resetHistory());
  };

  return (
    <LinearGradient
      colors={[
        color.APP_PRIMARY_BACKGROUND_FIRST_GRADIENT,
        color.APP_PRIMARY_BACKGROUND_SECOND_GRADIENT,
      ]}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.wrapper}>
        {/* <Text style={{ paddingTop: insets.top }}>
          test text drinkHistory: {JSON.stringify(drinkHistory)}
        </Text> */}
        {/* <Button title="debug: reset history" onPress={handleOnPress}></Button> */}
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
              ></HistoryItem>
            )}
            keyExtractor={(item) => item.id}
            getItemLayout={(data, index) => ({
              length: listItemHeight[SCREEN_SIZE],
              offset: listItemHeight[SCREEN_SIZE] * index,
              index,
            })}
          ></FlatList>
        </View>
        <View style={styles.bottomWrapper}>
          <HistoryBottom
            totalDrinkQuantityToday={totalDrinkQuantityToday}
          ></HistoryBottom>
        </View>
      </View>
    </LinearGradient>
  );
}

export { History };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
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
