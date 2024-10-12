import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { ContentPage } from "@/components/wrappers";

import {
  paragraphLargeFontSize,
  paragraphMediumFontSize,
} from "@/utils/constants/components/typography";
import LinkButton from "@/components/buttons/LinkButton";

function SourcesSettings() {
  const { t } = useTranslation();

  return (
    <ContentPage title={t("settings.sources.header")}>
      <View style={styles.section}>
        <PrimaryText fontSize={paragraphLargeFontSize}>
          {t("settings.sources.subtitle_1")}
        </PrimaryText>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {t("settings.sources.text_1")}
        </PrimaryText>
        <LinkButton url="https://google.com" />
      </View>
      <View style={styles.section}>
        <PrimaryText fontSize={paragraphLargeFontSize}>
          {t("settings.sources.subtitle_2")}
        </PrimaryText>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {t("settings.sources.text_2")}
        </PrimaryText>
        <LinkButton text="google likn" url="https://google.com" />
      </View>
    </ContentPage>
  );
}

export { SourcesSettings };

const styles = StyleSheet.create({
  section: {
    marginBottom: "5%",
  },
});
