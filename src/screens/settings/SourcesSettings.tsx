import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { ContentPage } from "@/components/wrappers";

import {
  paragraphLargeFontSize,
  paragraphSmallFontSize,
} from "@/utils/constants/components/typography";
import LinkButton from "@/components/buttons/LinkButton";
import { color } from "@/utils/constants";

function SourcesSettings() {
  const { t } = useTranslation();

  return (
    <ContentPage title={t("settings.sources.header")}>
      <View style={styles.section}>
        <PrimaryText color={color.BLUE} fontSize={paragraphLargeFontSize}>
          {t("settings.sources.subtitle_1")}
        </PrimaryText>
        <PrimaryText fontSize={paragraphSmallFontSize}>
          {t("settings.sources.text_1")}
        </PrimaryText>
      </View>
      <View style={styles.section}>
        <PrimaryText color={color.BLUE} fontSize={paragraphLargeFontSize}>
          {t("settings.sources.subtitle_2")}
        </PrimaryText>
        <PrimaryText fontSize={paragraphSmallFontSize}>
          {t("settings.sources.text_2")}
        </PrimaryText>
        <View style={styles.wrapper}>
          <LinkButton
            fontSize={paragraphSmallFontSize}
            text={t("settings.sources.link_2_1")}
            url="https://academic.oup.com/alcalc/article-abstract/45/4/366/155478?redirectedFrom=fulltext&login=false"
          />
        </View>
        <View style={styles.wrapper}>
          <LinkButton
            fontSize={paragraphSmallFontSize}
            text={t("settings.sources.link_2_2")}
            url="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6286152/"
          />
        </View>
        <View style={styles.wrapper}>
          <LinkButton
            fontSize={paragraphSmallFontSize}
            text={t("settings.sources.link_2_3")}
            url="https://pubmed.ncbi.nlm.nih.gov/20497950/"
          />
        </View>
      </View>
      <View style={styles.section}>
        <PrimaryText color={color.BLUE} fontSize={paragraphLargeFontSize}>
          {t("settings.sources.subtitle_3")}
        </PrimaryText>
        <PrimaryText fontSize={paragraphSmallFontSize}>
          {t("settings.sources.text_3")}
        </PrimaryText>
        <LinkButton
          fontSize={paragraphSmallFontSize}
          text={t("settings.sources.link_3")}
          url="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3400212/"
        />
      </View>
      <View style={styles.section}>
        <PrimaryText color={color.BLUE} fontSize={paragraphLargeFontSize}>
          {t("settings.sources.subtitle_4")}
        </PrimaryText>
        <PrimaryText fontSize={paragraphSmallFontSize}>
          {t("settings.sources.text_4")}
        </PrimaryText>
        <LinkButton
          fontSize={paragraphSmallFontSize}
          text={t("settings.sources.link_4")}
          url="https://sites.google.com/view/drinky-faq/"
        />
        <PrimaryText fontSize={paragraphSmallFontSize}>
          {t("settings.sources.text_4_2")}
        </PrimaryText>
      </View>
    </ContentPage>
  );
}

export { SourcesSettings };

const styles = StyleSheet.create({
  section: {
    marginBottom: "5%",
  },
  wrapper: {
    marginBottom: "2%",
  },
});
