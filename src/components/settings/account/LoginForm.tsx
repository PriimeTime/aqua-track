import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import googleLogo from "../../../../assets/icons/google-logo.png";

import { useFormValidation } from "@/hooks";

import { CustomTextField } from "@/components/input";
import { PrimaryButton } from "@/components/buttons";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { color, fontFamily } from "@/utils/constants";
import { loadUserData } from "@/utils/database";
import {
  loginFormErrorFontSize,
  loginFormFontSize,
} from "@/utils/constants/components/forms";
import { saveAuthData } from "@/utils/auth";

import { setUserMetrics, setUserAuth } from "@/store/userData";
import { setHistory } from "@/store/drinkHistory";

import { UserAuth } from "@/models/UserAuth";

import { type UserUID } from "@/types/UserUID";

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
  const dispatch = useDispatch();
  const auth = getAuth();
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
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );

      const user = userCredentials.user;
      const userUID: UserUID = user.uid;

      const userData = await loadUserData(userUID);

      const authData: UserAuth = {
        isLoggedIn: true,
        userName: userData?.userAuth.userName,
        email: userData?.userAuth.email,
        uid: userUID,
      };

      saveAuthData(authData);

      if (userData) {
        dispatch(setHistory(userData.userDrinkHistory));
        dispatch(setUserMetrics(userData.userMetrics));
        dispatch(setUserAuth(authData));
      } else {
        console.error("Unable to load user data --> userData falsy");
      }
      setLoading(false);
    } catch (error) {
      let errMsg = "";

      if (error instanceof Error) {
        errMsg = error.message;
      }

      // TODO: create an invisible input field below all others and display
      // general error messages there

      if (errMsg.includes("invalid-email")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid e-mail",
        }));
      } else if (errMsg.includes("invalid-credential")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Wrong e-mail or password",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Something went wrong. Please try again.",
        }));
      }
      setLoading(false);
    }
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
