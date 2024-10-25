import { View } from "react-native";

import { PrimaryText } from "@/components/texts";
import { ContentPage } from "@/components/wrappers";
import { useTranslation } from "react-i18next";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";

function LanguageSettings() {
  const { t } = useTranslation();

  return (
    <ContentPage title={t("settings.language.header")}>
      <View style={{ alignItems: "center" }}>
        <PrimaryText numberOfLines={1} fontSize={paragraphMediumFontSize}>
          {t("settings.comingSoon")}
        </PrimaryText>
      </View>
    </ContentPage>
  );
}

export { LanguageSettings };
