import { View, Text } from "react-native";

import { PrimaryButton } from "@/components/buttons";
import { CustomTextField } from "@/components/input";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

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
        handleOnChangeText={(text) => handleInputChange("email", text)}
        handleOnBlur={() => validateForm(false, "email")}
        handleOnFocus={() => resetInputValidation("email")}
        fullWidth
        inputType={CustomTextFieldInputType.Email}
        label="E-mail"
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.email}</Text>
      </View>
      <CustomTextField
        value={formState.password}
        handleOnChangeText={(text) => handleInputChange("password", text)}
        handleOnBlur={() => validateForm(false, "password")}
        handleOnFocus={() => resetInputValidation("password")}
        fullWidth
        inputType={CustomTextFieldInputType.Password}
        label="Password"
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.password}</Text>
      </View>
      <CustomTextField
        value={formState.confirmPassword}
        handleOnChangeText={(text) =>
          handleInputChange("confirmPassword", text)
        }
        handleOnBlur={() => validateForm(true, "confirmPassword")}
        handleOnFocus={() => resetInputValidation("confirmPassword")}
        fullWidth
        inputType={CustomTextFieldInputType.Password}
        label="Confirm password"
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>
      </View>
      <PrimaryButton isLoading={loading} onPress={handleOnRegister}>
        {"register".toUpperCase()}
      </PrimaryButton>
      <PrimaryButton
        btnColor={color.WHITE}
        textStyle={{ color: color.BLUE }}
        onPress={redirectToLogin}
      >
        {"login".toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { RegisterForm };

const styles = formErrorStyles;
