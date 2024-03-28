import { InputContentWrapper } from "./InputContentWrapper";
import { CustomTextField } from "../../components/input/CustomTextField";
import { View } from "react-native";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

function RegisterPage() {
  const handleOnRegister = () => {};

  return (
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
      <InputContentWrapper>
        <CustomTextField
          fullWidth
          inputType="password"
          label="Confirm password"
        ></CustomTextField>
      </InputContentWrapper>
      <View>
        <PrimaryButton onPress={handleOnRegister}>
          {"register".toUpperCase()}
        </PrimaryButton>
      </View>
    </>
  );
}

export { RegisterPage };
