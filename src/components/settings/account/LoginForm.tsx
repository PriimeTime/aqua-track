import { View, Text, StyleSheet, Image } from "react-native";
import { CustomTextField } from "@/components/input/CustomTextField";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SCREEN_SIZE, color, fontFamily } from "@/utils/constants";
import googleLogo from "../../../../assets/icons/google-logo.png";
import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { LoginFormState } from "@/models/LoginFormState";

const textSize = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 60,
};

const errorTextSize = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 30,
};

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
  handleInputChange: (fieldName: string, value: string) => void;
  handleOnLogin: () => Promise<void>;
  redirectToRegister: () => void;
  validateForm: (isRegister: boolean, fieldName?: string) => void;
  resetInputValidation: (fieldName: string) => void;
  formState: LoginFormState;
  formErrors: { [key: string]: string };
  loading: boolean;
}

function LoginForm({
  handleInputChange,
  handleOnLogin,
  redirectToRegister,
  validateForm,
  resetInputValidation,
  formState,
  formErrors,
  loading,
}: LoginFormProps) {
  const handleOnAppleSignIn = () => {
    // TODO: firebase apple signin
  };
  const handleOnGoogleSignIn = () => {
    // TODO: firebase google signin
  };

  return (
    <>
      <CustomTextField
        value={formState.email}
        handleOnChangeText={(text) => handleInputChange("email", text)}
        handleOnBlur={() => validateForm(false, "email")}
        handleOnFocus={() => resetInputValidation("email")}
        fullWidth
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
    fontSize: textSize[SCREEN_SIZE],
    letterSpacing: 0,
    color: color.BLACK,
  },
});

const styles = StyleSheet.create({
  errorWrapper: {
    justifyContent: "center",
    height: errorTextSize[SCREEN_SIZE] * 1.5,
  },
  errorText: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: errorTextSize[SCREEN_SIZE],
    color: color.RED,
  },
});
