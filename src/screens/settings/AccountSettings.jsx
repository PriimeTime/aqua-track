import { View } from "react-native";
import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";

const ContentWrapper = ({ children, ...props }) => {
  return (
    <View style={{ marginBottom: "5%" }} {...props}>
      {children}
    </View>
  );
};

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
    </ContentPage>
  );
}

export { AccountSettings };
