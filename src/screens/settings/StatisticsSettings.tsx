import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { ContentPage } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";

function StatisticsSettings() {
  const { t } = useTranslation();

  return (
    <ContentPage title={t("settings.statistics.header")}>
      <View style={{ alignItems: "center" }}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {t("settings.comingSoon")}
        </PrimaryText>
      </View>
    </ContentPage>
  );
}

export { StatisticsSettings };
