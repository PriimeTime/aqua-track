import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CustomTextField } from "@/components/input";

import { type UserDataState } from "@/types/store/UserDataState";

import { color } from "@/utils/constants";

interface AccountDetailsProps {
  onLogout: () => void;
  onRemoveAccount: () => void;
}

function AccountDetails({ onLogout, onRemoveAccount }: AccountDetailsProps) {
  const { t } = useTranslation();

  const userAuth = useSelector(
    (state: UserDataState) => state.userData.userAuth
  );

  return (
    <>
      <CustomTextField
        customStyles={styles.textField}
        readOnly
        value={userAuth.userName ?? ""}
        fullWidth
        label={t("settings.account.username")}
        labelColor={color.BLUE}
      ></CustomTextField>
      <CustomTextField
        customStyles={styles.textField}
        readOnly
        value={userAuth.email ?? ""}
        fullWidth
        label={t("settings.account.email")}
        labelColor={color.BLUE}
      ></CustomTextField>
      <PrimaryButton btnColor={color.RED} onPress={onLogout}>
        {t("settings.account.logout").toUpperCase()}
      </PrimaryButton>
      <PrimaryButton btnColor={color.RED} flat onPress={onRemoveAccount}>
        {t("settings.account.removeAccount").toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { AccountDetails };

const styles = StyleSheet.create({
  textField: {
    marginBottom: "2.5%",
  },
});
