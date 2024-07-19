import { View, Text, StyleSheet, Image } from "react-native";

import googleLogo from "../../../../assets/icons/google-logo.png";

import { useFormValidation } from "@/hooks";

import { CustomTextField } from "@/components/input";
import { PrimaryButton } from "@/components/buttons";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { color, fontFamily } from "@/utils/constants";
import {
  loginFormErrorFontSize,
  loginFormFontSize,
} from "@/utils/constants/components/forms";

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

const GoogleButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={googleButtonStyles.wrapper}>
      <View style={googleButtonStyles.flexBoxWrapper}>
        <View style={googleButtonStyles.imageWrapper}>
          <Image style={googleButtonStyles.image} source={googleLogo}></Image>
        </View>
        <View style={googleButtonStyles.textWrapper}>
          <Text style={googleButtonStyles.text}>{children}</Text>
        </View>
      </View>
    </View>
  );
};

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
  const [login] = useFirebaseAuth();

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

  const handleOnAppleSignIn = () => {
    // TODO: firebase apple signin
  };
  const handleOnGoogleSignIn = () => {
    // TODO: firebase google signin
  };

  const handleOnLogin = async () => {
    await login(
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
        btnColor={color.WHITE}
        custom
        onPress={handleOnGoogleSignIn}
      >
        <GoogleButton>{"Sign in with Google"}</GoogleButton>
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

const googleButtonStyles = StyleSheet.create({
  wrapper: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  flexBoxWrapper: {
    flexDirection: "row",
  },
  imageWrapper: {
    width: "25%",
    height: "100%",
    alignItems: "flex-end",
  },
  image: {
    left: "10%",
    width: "80%",
    top: "10%",
    height: "80%",
    objectFit: "contain",
  },
  textWrapper: {
    width: "75%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: fontFamily.GOOGLE,
    textAlign: "center",
    fontSize: loginFormFontSize,
    letterSpacing: 0,
    color: color.BLACK,
  },
});

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
