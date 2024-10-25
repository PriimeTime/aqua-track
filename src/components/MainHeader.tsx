import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { ms } from "react-native-size-matters";

import { PrimaryText } from "@/components/texts";

import { FONT_SIZE_30 } from "@/utils/constants";

function MainHeader() {
  const { t } = useTranslation();

  return (
    <View style={{ alignItems: "center" }}>
      <PrimaryText numberOfLines={1} fontSize={ms(FONT_SIZE_30)}>
        {t("home.header")}
      </PrimaryText>
    </View>
  );
}

export { MainHeader };
