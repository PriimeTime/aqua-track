import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MainHeader } from "./screens/MainHeader";
import { InputScreen } from "./screens/InputScreen";
import { Statistics } from "./screens/Statistics";

function HomeScreen({ navigation, amountDrank, setAmountDrank }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MainHeader amountDrank={amountDrank}></MainHeader>
      <InputScreen navigation={navigation} setAmountDrank={setAmountDrank} />
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
    backgroundColor: "#fff",
  },
});
