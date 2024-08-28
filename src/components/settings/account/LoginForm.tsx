import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { useFormValidation, useFirebaseAuth } from "@/hooks";

import { CustomTextField } from "@/components/input";
import { PrimaryButton } from "@/components/buttons";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { color, fontFamily } from "@/utils/constants";
import { loginFormErrorFontSize } from "@/utils/constants/components/forms";
import { FormInputType } from "@/enums/input/FormInputType";

interface LoginFormProps {
  setAccountSettingsState: React.Dispatch<
    React.SetStateAction<AccountSettingsState>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

function LoginForm({
  setAccountSettingsState,
  setLoading,
  loading,
}: LoginFormProps) {
  const { firebaseLogin, firebaseSignInWithApple } = useFirebaseAuth();
  const { t } = useTranslation();

  const {
    handleInputChange,
    validateForm,
    resetInputValidation,
    formState,
    formErrors,
    setFormErrors,
  } = useFormValidation();

  const redirectToRegister = () => {
    setAccountSettingsState(AccountSettingsState.ShowRegister);
  };

  const handleOnAppleSignIn = async () => {
    firebaseSignInWithApple();
  };

  const redirectToForgotPassword = () => {
    setAccountSettingsState(AccountSettingsState.ShowForgotPassword);
  };

  const handleOnLogin = async () => {
    await firebaseLogin(
      formState.email,
      formState.password,
      setFormErrors,
      setLoading,
      validateForm()
    );
  };

  return (
    <>
      <CustomTextField
        value={formState.email}
        handleOnChangeText={(text) =>
          handleInputChange(FormInputType.Email, text)
        }
        handleOnBlur={() => validateForm(false, FormInputType.Email)}
        handleOnFocus={() => resetInputValidation(FormInputType.Email)}
        fullWidth
        inputType={CustomTextFieldInputType.Email}
        label={t("settings.account.email")}
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.email}</Text>
      </View>
      <CustomTextField
        value={formState.password}
        handleOnChangeText={(text) =>
          handleInputChange(FormInputType.Password, text)
        }
        handleOnBlur={() => validateForm(false, FormInputType.Password)}
        handleOnFocus={() => resetInputValidation(FormInputType.Password)}
        fullWidth
        inputType={CustomTextFieldInputType.Password}
        label={t("settings.account.password")}
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.password}</Text>
      </View>
      <PrimaryButton flat onPress={redirectToForgotPassword}>
        {t("settings.account.forgotPwText").toUpperCase()}
      </PrimaryButton>
      <PrimaryButton isLoading={loading} onPress={handleOnLogin}>
        {t("settings.account.login").toUpperCase()}
      </PrimaryButton>
      <PrimaryButton
        btnColor={color.WHITE}
        textStyle={{ color: color.BLUE }}
        onPress={redirectToRegister}
      >
        {t("settings.account.register").toUpperCase()}
      </PrimaryButton>
      <PrimaryButton
        btnColor={color.BLACK}
        onPress={handleOnAppleSignIn}
        textStyle={{
          letterSpacing: 0,
          fontWeight: "bold",
          fontFamily: fontFamily.SYSTEM,
          color: color.WHITE,
        }}
      >
        {` ${t("settings.account.loginApple")}`}
      </PrimaryButton>
    </>
  );
}

export { LoginForm };

const styles = StyleSheet.create({
  errorWrapper: {
    justifyContent: "center",
    height: loginFormErrorFontSize * 1.5,
  },
  errorText: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: loginFormErrorFontSize,
    color: color.RED,
  },
});
