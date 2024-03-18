import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";

function ProfileSettings() {
  return (
    <ContentPage title="Metrics & Body Measurements">
      {/* <CustomTextField
        keyboardType="numeric"
        maxLength={2}
        label="Age"
      ></CustomTextField>
      <CustomTextField
        keyboardType="numeric"
        maxLength={3}
        label="Weight"
        append="kg"
      ></CustomTextField> */}
    </ContentPage>
  );
}

export { ProfileSettings };
