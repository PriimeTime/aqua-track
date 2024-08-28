import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { PrimaryButton } from "@/components/buttons";
import { CustomTextField } from "@/components/input";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";
import { FormInputType } from "@/enums/input/FormInputType";

import { useFormValidation, useFirebaseAuth } from "@/hooks";

import { color } from "@/utils/constants";
import { formErrorStyles } from "@/utils/styles";

interface RegisterFormProps {
  setAccountSettingsState: React.Dispatch<
    React.SetStateAction<AccountSettingsState>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

function RegisterForm({
  setAccountSettingsState,
  setLoading,
  loading,
}: RegisterFormProps) {
  const { t } = useTranslation();
  const {
    validateForm,
    formState,
    formErrors,
    resetFormState,
    handleInputChange,
    resetInputValidation,
  } = useFormValidation();

  const { firebaseRegister } = useFirebaseAuth();

  const redirectToLogin = () => {
    setAccountSettingsState(AccountSettingsState.ShowLogin);
  };

  const handleOnRegister = async () => {
    await firebaseRegister(
      formState.email,
      formState.password,
      resetFormState,
      setLoading,
      validateForm
    );
  };

  return (
    <>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.userName}</Text>
      </View>
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
      <CustomTextField
        value={formState.confirmPassword}
        handleOnChangeText={(text) =>
          handleInputChange(FormInputType.ConfirmPassword, text)
        }
        handleOnBlur={() => validateForm(true, FormInputType.ConfirmPassword)}
        handleOnFocus={() =>
          resetInputValidation(FormInputType.ConfirmPassword)
        }
        fullWidth
        inputType={CustomTextFieldInputType.Password}
        label={t("settings.account.confPassword")}
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>
      </View>
      <PrimaryButton isLoading={loading} onPress={handleOnRegister}>
        {t("settings.account.register").toUpperCase()}
      </PrimaryButton>
      <PrimaryButton
        btnColor={color.WHITE}
        textStyle={{ color: color.BLUE }}
        onPress={redirectToLogin}
      >
        {t("settings.account.login").toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { RegisterForm };

const styles = formErrorStyles;
