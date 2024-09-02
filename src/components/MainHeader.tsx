import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";

import { mainHeaderFontSize } from "@/utils/constants/components/typography";

function MainHeader() {
  const { t } = useTranslation();

  return (
    <View style={{ alignItems: "center" }}>
      <PrimaryText fontSize={mainHeaderFontSize}>
        {t("home.header")}
      </PrimaryText>
    </View>
  );
}

export { MainHeader };
