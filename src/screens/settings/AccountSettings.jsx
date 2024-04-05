import { View, Text, Image, StyleSheet } from "react-native";
import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { color, fontFamily } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";
import googleLogo from "../../../assets/icons/google-logo.png";
import { useState } from "react";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../utils/validation";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.
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

const GoogleButton = ({ children }) => {
  return (
    <View style={styles.googleButton.wrapper}>
      <View style={styles.googleButton.flexBoxWrapper}>
        <View style={styles.googleButton.imageWrapper}>
          <Image style={styles.googleButton.image} source={googleLogo}></Image>
        </View>
        <View style={styles.googleButton.textWrapper}>
          <Text style={styles.googleButton.text}>{children}</Text>
        </View>
      </View>
    </View>
  );
};

function AccountSettings() {
  const handleOnLogin = () => {
    if (validateForm()) {
      // TODO: firebase email login
    }
  };

  const handleOnLogout = () => {
    // TODO: firebase email logout
  };

  const handleOnRegister = () => {
    if (validateForm(true)) {
      // TODO: firebase email register
    }
  };

  const handleOnAppleSignIn = () => {
    // TODO: firebase apple signin
  };
  const handleOnGoogleSignIn = () => {
    // TODO: firebase google signin
  };

  const handleToggleLogin = () => {
    showRegisterPage ? setTitle("Login") : setTitle("Register");
    setShowRegisterPage(!showRegisterPage);
  };

  const handleInputChange = (fieldName, value) => {
    setFormState((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const resetInputValidation = (fieldName) => {
    if (formErrors[fieldName]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  };

  const validateForm = (isRegister = false, fieldName) => {
    let newErrors = { ...formErrors }; // Start with current errors
    let isValid = true;

    const validateField = (fieldKey) => {
      switch (fieldKey) {
        case "email":
          const emailValidation = validateEmail(formState.email);
          if (!emailValidation.isValid) {
            newErrors.email = emailValidation.newErrors;
            isValid = false;
          } else {
            delete newErrors.email;
          }
          break;
        case "password":
          const passwordValidation = validatePassword(formState.password);
          if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.newErrors;
            isValid = false;
          } else {
            delete newErrors.password;
          }
          break;
        case "confirmPassword":
          if (isRegister) {
            const confirmPasswordValidation = validateConfirmPassword(
              formState.password,
              formState.confirmPassword
            );
            if (!confirmPasswordValidation.isValid) {
              newErrors.confirmPassword = confirmPasswordValidation.newErrors;
              isValid = false;
            } else {
              delete newErrors.confirmPassword;
            }
          }
          break;
        default:
          break;
      }
    };

    if (fieldName) {
      // Validate specific field
      validateField(fieldName);
    } else {
      // Validate all fields
      validateField("email");
      validateField("password");
      if (isRegister) {
        validateField("confirmPassword");
      }
    }

    setFormErrors(newErrors); // Update state with new errors
    return isValid;
  };

  const [title, setTitle] = useState("Login");
  const [formErrors, setFormErrors] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  /**
   * Handles whether register or login page
   * should be shown when user is not logged in
   */
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  // TODO: fetch user login state here
  // if logged in --> show logout option instead of login options
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ContentPage key={title} title={title}>
      {!isLoggedIn && (
        <>
          <CustomTextField
            handleOnChangeText={(text) => handleInputChange("email", text)}
            handleOnBlur={() => validateForm("email")}
            handleOnFocus={() => resetInputValidation("email")}
            fullWidth
            label="E-mail"
          ></CustomTextField>
          <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>{formErrors.email}</Text>
          </View>
          <CustomTextField
            handleOnChangeText={(text) => handleInputChange("password", text)}
            handleOnBlur={() => validateForm("password")}
            handleOnFocus={() => resetInputValidation("password")}
            fullWidth
            inputType="password"
            label="Password"
          ></CustomTextField>
          <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>{formErrors.password}</Text>
          </View>
          {showRegisterPage && (
            <>
              <CustomTextField
                handleOnChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
                handleOnBlur={() => validateForm(true, "confirmPassword")}
                handleOnFocus={() => resetInputValidation("confirmPassword")}
                fullWidth
                inputType="password"
                label="Confirm password"
              ></CustomTextField>
              <View style={styles.errorWrapper}>
                <Text style={styles.errorText}>
                  {formErrors.confirmPassword}
                </Text>
              </View>
              <PrimaryButton onPress={handleOnRegister}>
                {"register".toUpperCase()}
              </PrimaryButton>
              <PrimaryButton
                btnColor={color.WHITE}
                textStyle={{ color: color.BLUE }}
                onPress={handleToggleLogin}
              >
                {"login".toUpperCase()}
              </PrimaryButton>
            </>
          )}
          {!showRegisterPage && (
            <>
              <PrimaryButton onPress={handleOnLogin}>
                {"login".toUpperCase()}
              </PrimaryButton>
              <PrimaryButton
                btnColor={color.WHITE}
                textStyle={{ color: color.BLUE }}
                onPress={handleToggleLogin}
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
          )}
        </>
      )}
      {isLoggedIn && (
        <>
          <PrimaryButton onPress={handleOnLogout}>
            {"log out".toUpperCase()}
          </PrimaryButton>
        </>
      )}
    </ContentPage>
  );
}

export { AccountSettings };

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
  googleButton: {
    wrapper: {
      width: "100%",
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
  },
});
