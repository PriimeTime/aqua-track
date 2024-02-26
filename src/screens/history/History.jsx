import { Text, StyleSheet, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import { resetHistory } from "../../store/store";
import { color } from "../../utils/themes";

function History() {
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
      style={styles.container}
    >
      <Text style={{ paddingTop: insets.top }}>
        drinkHistory: {JSON.stringify(drinkHistory)}
      </Text>
      <Button title="debug: reset history" onPress={handleOnPress}></Button>
    </LinearGradient>
  );
}

export { History };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
