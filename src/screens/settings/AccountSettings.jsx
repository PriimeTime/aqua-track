import { View, Text, Image, StyleSheet } from "react-native";
import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { InputContentWrapper } from "./InputContentWrapper";
import { color, fontFamily } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";
import googleLogo from "../../../assets/icons/google-logo.png";
import { useNavigation } from "@react-navigation/native";

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

const handleOnLogin = () => {};

const handleOnRegister = () => {};

const handleOnAppleSignIn = () => {};

const handleOnGoogleSignIn = () => {};

function AccountSettings() {
  return (
    <ContentPage title="Account">
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
      <PrimaryButton onPress={handleOnLogin}>
        {"login".toUpperCase()}
      </PrimaryButton>
      <PrimaryButton
        btnColor={color.WHITE}
        textStyle={{ color: color.BLUE }}
        onPress={() => handleOnRegister(navigation)}
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
