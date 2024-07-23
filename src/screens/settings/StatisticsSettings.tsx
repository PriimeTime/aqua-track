import { View } from "react-native";

import { PrimaryText } from "@/components/texts";
import { ContentPage } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";

function StatisticsSettings() {
  return (
    <ContentPage title="Statistics & History">
      <View style={{ alignItems: "center" }}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          Coming Soon...
        </PrimaryText>
      </View>
    </ContentPage>
  );
}

export { StatisticsSettings };
