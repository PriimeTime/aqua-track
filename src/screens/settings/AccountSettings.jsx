import { View, Text, Image, StyleSheet } from "react-native";
import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputContentWrapper } from "./InputContentWrapper";
import { color, fontFamily } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";
import googleLogo from "../../../assets/icons/google-logo.png";
import { useState } from "react";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.
const textSize = {
  SMALL: 20,
  MEDIUM: 25,
  LARGE: 60,
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
  const handleOnLogin = () => {};
  const handleOnLogout = () => {};
  const handleOnRegister = () => {};

  const handleToggleLogin = () => {
    showRegisterPage ? setTitle("Login") : setTitle("Register");
    setShowRegisterPage(!showRegisterPage);
  };

  const handleOnAppleSignIn = () => {};
  const handleOnGoogleSignIn = () => {};

  const [title, setTitle] = useState("Login");

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
          <InputContentWrapper>
            <CustomTextField fullWidth label="E-mail"></CustomTextField>
          </InputContentWrapper>
          <InputContentWrapper>
            <CustomTextField
              fullWidth
              inputType="password"
              label="Password"
            ></CustomTextField>
          </InputContentWrapper>
          {showRegisterPage && (
            <>
              <InputContentWrapper>
                <CustomTextField
                  fullWidth
                  inputType="password"
                  label="Confirm password"
                ></CustomTextField>
              </InputContentWrapper>
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
