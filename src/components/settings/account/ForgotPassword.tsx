import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { CustomTextField } from "@/components/input";
import { PrimaryText } from "@/components/texts";
import { PrimaryButton } from "@/components/buttons";

import { paragraphFontSize } from "@/utils/constants/components/typography";
import { formErrorStyles } from "@/utils/styles";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { useFormValidation, useModal } from "@/hooks";

interface ForgotPasswordProps {
  setAccountSettingsState: (accountSettinsState: AccountSettingsState) => void;
}

function ForgotPassword({ setAccountSettingsState }: ForgotPasswordProps) {
  const [openModal] = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    validateForm,
    formState,
    formErrors,
    handleInputChange,
    resetInputValidation,
  } = useFormValidation();
  const auth = getAuth();

  const handleSendPasswordResetEmail = async () => {
    if (!validateForm(false, "email")) return;

    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, formState.email);
      setIsLoading(false);

      openModal({
        modalText:
          "We've sent out an email to your address. Please check your inbox!",
        onConfirm: () =>
          setAccountSettingsState(AccountSettingsState.ShowLogin),
      });
    } catch (error) {
      setIsLoading(false);
      openModal({ modalText: "Couldn't send email. Please try again later" });
    }
  };

  return (
    <>
      <PrimaryText fontSize={paragraphFontSize}>
        {"Don't worry! Just enter the email address of your account."}
      </PrimaryText>
      <PrimaryText fontSize={paragraphFontSize}>
        {"We will send you a link to reset your password :)"}
      </PrimaryText>
      <CustomTextField
        customStyles={styles.textField}
        value={formState.email}
        handleOnChangeText={(text) => handleInputChange("email", text)}
        handleOnFocus={() => resetInputValidation("email")}
        inputType={CustomTextFieldInputType.Email}
        placeholder={"E-mail"}
        fullWidth
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.email}</Text>
      </View>
      <PrimaryButton
        isLoading={isLoading}
        onPress={handleSendPasswordResetEmail}
      >
        {"Send E-mail".toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { ForgotPassword };

const styles = StyleSheet.create({
  textField: {
    marginBottom: "2.5%",
  },
  ...formErrorStyles,
});
