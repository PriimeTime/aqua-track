import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function History() {
  const insets = useSafeAreaInsets();

  return <Text style={{ paddingTop: insets.top }}>history_placeholder</Text>;
}

export { History };
