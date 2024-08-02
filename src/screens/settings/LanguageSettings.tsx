import { View } from "react-native";

import { PrimaryText } from "@/components/texts";
import { ContentPage } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";

function LanguageSettings() {
  return (
    <ContentPage title="Language">
      <View style={{ alignItems: "center" }}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          Coming Soon...
        </PrimaryText>
      </View>
    </ContentPage>
  );
}

export { LanguageSettings };
