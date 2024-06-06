import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CustomTextField } from "@/components/input/CustomTextField";
import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { RegisterFormState } from "@/models/RegisterFormState";
import { SCREEN_SIZE, color, fontFamily } from "@/utils/constants";
import { View, StyleSheet, Text } from "react-native";

const errorTextSize = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 30,
};

interface RegisterFormProps {
  handleInputChange: (fieldName: string, value: string) => void;
  handleOnRegister: () => Promise<void>;
  redirectToLogin: () => void;
  validateForm: (isRegister: boolean, fieldName?: string) => void;
  resetInputValidation: (fieldName: string) => void;
  formState: RegisterFormState;
  formErrors: { [key: string]: string };
  loading: boolean;
}

function RegisterForm({
  handleInputChange,
  handleOnRegister,
  redirectToLogin,
  validateForm,
  resetInputValidation,
  formState,
  formErrors,
  loading,
}: RegisterFormProps) {
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
      <PrimaryButton onPress={handleOnRegister}>
        {"register".toUpperCase()}
      </PrimaryButton>
      <PrimaryButton
        btnColor={color.WHITE}
        textStyle={{ color: color.BLUE }}
        onPress={redirectToLogin}
        isLoading={loading}
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
    height: errorTextSize[SCREEN_SIZE] * 1.5,
  },
  errorText: {
    fontFamily: fontFamily.DEFAULT,
    fontSize: errorTextSize[SCREEN_SIZE],
    color: color.RED,
  },
});
