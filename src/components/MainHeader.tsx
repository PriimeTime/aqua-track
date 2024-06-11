import { View } from "react-native";

import { PrimaryText } from "@/components/texts";

import { SCREEN_SIZE } from "@/utils/constants";

const textSize = {
  SMALL: 5,
  MEDIUM: 6,
  LARGE: 9,
};

function MainHeader() {
  return (
    <View style={{ alignItems: "center" }}>
      <PrimaryText size={textSize[SCREEN_SIZE]}>
        Your hydration today
      </PrimaryText>
    </View>
  );
}

export { MainHeader };
