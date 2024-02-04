import { Text, View, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { resetHistory } from "../../store/store";

function History() {
  const insets = useSafeAreaInsets();
  const drinkHistory = useSelector((state) => state.drinkHistory);
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(resetHistory());
  };

  return (
    <View>
      <Text style={{ paddingTop: insets.top }}>
        drinkHistory: {JSON.stringify(drinkHistory)}
      </Text>
      <Button title="debug: reset history" onPress={handleOnPress}></Button>
    </View>
  );
}

export { History };
