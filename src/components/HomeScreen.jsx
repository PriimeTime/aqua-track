import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MainHeader } from "./screens/MainHeader";
import { MainButton } from "./screens/MainButton";
import { Statistics } from "./screens/Statistics";
import { color } from "../utils/themes";

function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MainHeader></MainHeader>
      <MainButton navigation={navigation} />
      <Statistics />
      <StatusBar style="auto" />
    </View>
  );
}

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
  },
});
