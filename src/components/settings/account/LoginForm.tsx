import { View, Text, StyleSheet } from "react-native";

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
        label="E-mail"
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
        label="Password"
      ></CustomTextField>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{formErrors.password}</Text>
      </View>
      <PrimaryButton flat onPress={redirectToForgotPassword}>
        {"forgot password".toUpperCase()}
      </PrimaryButton>
      <PrimaryButton isLoading={loading} onPress={handleOnLogin}>
        {"login".toUpperCase()}
      </PrimaryButton>
      <PrimaryButton
        btnColor={color.WHITE}
        textStyle={{ color: color.BLUE }}
        onPress={redirectToRegister}
      >
        {"register".toUpperCase()}
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
        {" Sign in with Apple"}
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
