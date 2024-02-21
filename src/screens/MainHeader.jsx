import { PrimaryText } from "../components/texts/PrimaryText";
import { View } from "react-native";
import SCREEN_SIZE from "../utils/screenSize";

const textSize = {
  SMALL: 2,
  MEDIUM: 3,
  LARGE: 6,
};

function MainHeader() {
  return (
    <View style={{ alignItems: "center" }}>
      <PrimaryText size={textSize[SCREEN_SIZE]}>Your intake today</PrimaryText>
    </View>
  );
}

export { MainHeader };
