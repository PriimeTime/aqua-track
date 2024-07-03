import { View } from "react-native";

import { PrimaryText } from "@/components/texts";

import { mainHeaderFontSize } from "@/utils/constants/components/typography";

function MainHeader() {
  return (
    <View style={{ alignItems: "center" }}>
      <PrimaryText fontSize={mainHeaderFontSize}>
        Your hydration today
      </PrimaryText>
    </View>
  );
}

export { MainHeader };
