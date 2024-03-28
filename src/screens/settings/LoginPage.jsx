import { InputContentWrapper } from "./InputContentWrapper";
import { CustomTextField } from "../../components/input/CustomTextField";
import { View } from "react-native";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

function LoginPage() {
  const handleOnLogin = () => {};

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
      <View>
        <PrimaryButton onPress={handleOnLogin}>
          {"login".toUpperCase()}
        </PrimaryButton>
      </View>
    </>
  );
}

export { LoginPage };
