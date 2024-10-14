import { View, StyleSheet } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { GradientWrapper } from "@/components/wrappers";

import { mainHeaderFontSize } from "@/utils/constants/components/typography";
import { startupStyles } from "@/utils/constants";
import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { useEffect } from "react";

function WelcomeScreen() {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const toNextScreen = () => {
    navigation.navigate(StartupRouteName.UserName);
  };

  /**
   * The next screen is navigated to after 5 seconds
   * allowing the user enough time to read the introductory text
   */
  useEffect(() => {
    setTimeout(toNextScreen, 5000);
  }, []);

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={[startupStyles.wrapper, styles.wrapper]}>
        <PrimaryText textAlign="center" fontSize={mainHeaderFontSize}>
          {t("home.welcome")}
        </PrimaryText>
      </View>
    </GradientWrapper>
  );
}

export { WelcomeScreen };

const styles = StyleSheet.create({
  wrapper: {
    width: "75%",
    left: "12.5%",
    top: "15%",
  },
});
