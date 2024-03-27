import { View } from "react-native";
import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

const ContentWrapper = ({ children, ...props }) => {
  return (
    <View style={{ marginBottom: "5%" }} {...props}>
      {children}
    </View>
  );
};

const handleOnLogin = () => {};

function AccountSettings() {
  return (
    <ContentPage title="Account">
      <ContentWrapper>
        <CustomTextField fullWidth label="E-mail"></CustomTextField>
      </ContentWrapper>
      <ContentWrapper>
        <CustomTextField
          fullWidth
          inputType="password"
          label="Password"
        ></CustomTextField>
      </ContentWrapper>
      <View>
        <PrimaryButton onPress={handleOnLogin}>
          {"login".toUpperCase()}
        </PrimaryButton>
      </View>
    </ContentPage>
  );
}

export { AccountSettings };
