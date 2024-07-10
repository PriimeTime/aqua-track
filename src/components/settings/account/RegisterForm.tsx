import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { PrimaryButton } from "@/components/buttons";
import { CustomTextField } from "@/components/input";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { type UserDataState } from "@/types/store/UserDataState";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";
import { type UserUID } from "@/types/UserUID";

import { useFormValidation } from "@/hooks";

import { setUserAuth } from "@/store/userData";

import { updateUserData } from "@/utils/database";
import { color, fontFamily } from "@/utils/constants";
import { registerFormErrorFontSize } from "@/utils/constants/components/forms";
import { saveAuthData } from "@/utils/auth";
import { UserAuth } from "@/models/UserAuth";

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
  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const userDrinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );

  const dispatch = useDispatch();
  const auth = getAuth();
  const {
    validateForm,
    formState,
    formErrors,
    resetFormState,
    handleInputChange,
    resetInputValidation,
  } = useFormValidation();

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

      const authData: UserAuth = {
        userName: formState.userName,
        email: formState.email,
        uid: userUID,
        isLoggedIn: true,
      };

      saveAuthData(authData);
      dispatch(setUserAuth(authData));

      // TODO: show alert box here with successful register message

      // Initialize user data in Firestore after successful registration
      await updateUserData(userUID, {
        userMetrics,
        userDrinkHistory,
        userAuth: {
          userName: formState.userName,
          email: formState.email,
          uid: userUID,
        },
      });

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
