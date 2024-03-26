import { Text } from "react-native";
import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";

function AccountSettings() {
  return (
    <ContentPage title="Account">
      <CustomTextField label="E-mail"></CustomTextField>
      <CustomTextField inputType="password" label="Password"></CustomTextField>
    </ContentPage>
  );
}

export { AccountSettings };
