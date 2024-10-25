import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ScaledSheet } from "react-native-size-matters";

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
        customStyles={scaledStyles.textField}
        readOnly
        value={userAuth.userName ?? ""}
        fullWidth
        label={t("settings.account.username")}
        labelColor={color.BLUE}
      ></CustomTextField>
      <CustomTextField
        customStyles={scaledStyles.textField}
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

const scaledStyles = ScaledSheet.create({
  textField: {
    marginBottom: "10@ms",
  },
});
