import { PrimaryText } from "../components/texts/PrimaryText";
import { View } from "react-native";

function MainHeader() {
  return (
    <View style={{ alignItems: "center" }}>
      <PrimaryText size={3}>Your intake today</PrimaryText>
    </View>
  );
}

export { MainHeader };
