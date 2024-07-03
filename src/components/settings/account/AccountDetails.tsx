import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CustomTextField } from "@/components/input";

import { type UserDataState } from "@/types/store/UserDataState";

import { color } from "@/utils/constants";

interface AccountDetailsProps {
  onLogout: () => void;
}

function AccountDetails({ onLogout }: AccountDetailsProps) {
  const userAuth = useSelector(
    (state: UserDataState) => state.userData.userAuth
  );

  return (
    <>
      <CustomTextField
        customStyles={styles.textFiled}
        readOnly
        value={userAuth.userName ?? ""}
        fullWidth
        label="Username"
      ></CustomTextField>
      <CustomTextField
        customStyles={styles.textFiled}
        readOnly
        value={userAuth.email ?? ""}
        fullWidth
        label="E-mail"
      ></CustomTextField>
      <PrimaryButton btnColor={color.RED} onPress={onLogout}>
        {"log out".toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { AccountDetails };

const styles = StyleSheet.create({
  textFiled: {
    marginBottom: "2.5%",
  },
});
