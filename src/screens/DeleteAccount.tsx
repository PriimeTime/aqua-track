import { View, StyleSheet } from "react-native";
import { useState } from "react";

import { t } from "i18next";

import { ContentPage } from "@/components/wrappers";
import { PrimaryText } from "@/components/texts";
import { CustomTextField } from "@/components/input";
import { PrimaryButton } from "@/components/buttons";

import { useFirebaseAuth } from "@/hooks";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { color } from "@/utils/constants";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";

function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { firebaseRemoveAccount } = useFirebaseAuth();

  return (
    <ContentPage title={t("settings.account.removeAccount")}>
      <View style={{ alignItems: "center" }}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {t("settings.account.pwToRemoveAccount")}
        </PrimaryText>
        <CustomTextField
          value={password}
          handleOnChangeText={(pw) => setPassword(pw)}
          fullWidth
          inputType={CustomTextFieldInputType.Password}
        ></CustomTextField>
        <PrimaryButton
          customStyles={styles.button}
          onPress={() => {
            setLoading(true);
            firebaseRemoveAccount(password, setLoading);
          }}
          isLoading={loading}
          btnColor={color.RED}
        >
          {t("settings.account.removeAccount").toUpperCase()}
        </PrimaryButton>
      </View>
    </ContentPage>
  );
}

export { DeleteAccount };

const styles = StyleSheet.create({
  button: {
    top: "10%",
  },
});
