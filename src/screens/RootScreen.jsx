import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { MainHeader } from "./MainHeader";
import { MainButton } from "./MainButton";
import { Statistics } from "./Statistics";
import { color } from "../utils/themes";

function RootScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MainHeader></MainHeader>
      <MainButton navigation={navigation} />
      {drinkHistory.length > 0 && <Statistics />}
      <StatusBar style="auto" />
    </View>
  );
}

export { RootScreen };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
  },
});
