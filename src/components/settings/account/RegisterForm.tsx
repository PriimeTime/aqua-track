import { View, StyleSheet, Text } from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PrimaryButton } from "@/components/buttons";
import { CustomTextField } from "@/components/input";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";
import { MainRouteName } from "@/enums/routes/MainRouteName";

import { type UserUID } from "@/types/UserUID";

import { useFormValidation, useModal } from "@/hooks";

import { color, fontFamily } from "@/utils/constants";
import { registerFormErrorFontSize } from "@/utils/constants/components/forms";

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
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const auth = getAuth();
  const {
    validateForm,
    formState,
    formErrors,
    resetFormState,
    handleInputChange,
    resetInputValidation,
  } = useFormValidation();

  const [openModal] = useModal();

  const redirectToLogin = () => {
    setAccountSettingsState(AccountSettingsState.ShowLogin);
  };

  const handleOnRegister = async () => {
    setLoading(true);

    if (!validateForm(true)) {
      setLoading(false);
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );

      const user = userCredentials.user;
      const userUID: UserUID = user.uid;

      try {
        const userDocRef = doc(firestore, "users", userUID);
        await setDoc(
          userDocRef,
          {
            userAuth: {
              email: formState.email,
              uid: userUID,
              userName: formState.userName,
              firstLogin: true,
            },
          },
          { merge: true }
        ); // Merges data with existing document
        await sendEmailVerification(user);
        setLoading(false);
        openModal({
          modalText:
            "Verification Email Sent! Please check your email to verify your account!",
          onConfirm: () => {
            navigation.navigate(MainRouteName.Home);
          },
        });
      } catch (error) {
        setLoading(false);
        console.error("Error during registration:", error);
        openModal({
          modalText: "Something went wrong. Please try again later.",
        });
      }

      resetFormState();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <CustomTextField
        value={formState.userName}
        handleOnChangeText={(text) => handleInputChange("userName", text)}
        handleOnBlur={() => validateForm(false, "userName")}
        handleOnFocus={() => resetInputValidation("userName")}
        fullWidth
        label="Username"
      ></CustomTextField>
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

const styles = StyleSheet.create({
  errorWrapper: {
    justifyContent: "center",
    height: registerFormErrorFontSize * 1.5,
  },
  errorText: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: registerFormErrorFontSize,
    color: color.RED,
  },
});
