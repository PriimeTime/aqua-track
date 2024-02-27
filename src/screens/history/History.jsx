import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { SettingsButton } from "../../components/buttons/SettingsButton";
import { resetHistory } from "../../store/store";
import { color } from "../../utils/themes";

function History() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const dispatch = useDispatch();

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
          <Text>placeholder tab bar for history</Text>
        </View>
        <View style={styles.listWrapper}>
          <Text style={{ paddingTop: insets.top }}>
            drinkHistory: {JSON.stringify(drinkHistory)}
          </Text>
        </View>
        <View style={styles.bottomWrapper}>
          <Text>today's total: 5.1L (placeholder)</Text>
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
    width: "90%",
    left: "5%",
    height: "100%",
  },
  settingsWrapper: {
    backgroundColor: "pink",
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
    backgroundColor: "violet",
    height: "10%",
  },
  listWrapper: {
    backgroundColor: "cyan",
    height: "55%",
  },
  bottomWrapper: {
    backgroundColor: "green",
    height: "25%",
  },
});
