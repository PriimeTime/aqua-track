import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { ContentPage } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";

function ThemeSettings() {
  const { t } = useTranslation();

  return (
    <ContentPage title={t("settings.themes.header")}>
      <View style={{ alignItems: "center" }}>
        <PrimaryText numberOfLines={1} fontSize={paragraphMediumFontSize}>
          {t("settings.comingSoon")}
        </PrimaryText>
      </View>
    </ContentPage>
  );
}

export { ThemeSettings };
