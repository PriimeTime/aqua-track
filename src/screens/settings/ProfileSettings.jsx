import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";
import { CustomSelectBox } from "../../components/input/CustomSelectBox";
import { View } from "react-native";

const genderSelectBoxItems = [
  { id: 1, title: "Male" },
  { id: 2, title: "Female" },
  { id: 3, title: "Other" },
];

const exerciseLevelSelectBoxItems = [
  { id: 1, title: "Low" },
  { id: 2, title: "Medium" },
  { id: 3, title: "High" },
];

const ContentWrapper = ({ children, ...props }) => {
  return (
    <View style={{ marginBottom: "5%" }} {...props}>
      {children}
    </View>
  );
};

function ProfileSettings() {
  return (
    <ContentPage title="Metrics & Body Measurements">
      <ContentWrapper>
        <CustomTextField
          keyboardType="numeric"
          maxLength={2}
          label="Age"
        ></CustomTextField>
      </ContentWrapper>
      <ContentWrapper>
        <CustomSelectBox
          items={genderSelectBoxItems}
          label="Gender"
        ></CustomSelectBox>
      </ContentWrapper>
      <ContentWrapper>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <CustomTextField
            keyboardType="numeric"
            maxLength={3}
            label="Height"
            append="cm"
          ></CustomTextField>
          <CustomTextField
            keyboardType="numeric"
            maxLength={3}
            label="Weight"
            append="kg"
          ></CustomTextField>
        </View>
      </ContentWrapper>
      <ContentWrapper>
        <CustomSelectBox
          items={exerciseLevelSelectBoxItems}
          label="Exercise Level"
        ></CustomSelectBox>
      </ContentWrapper>
    </ContentPage>
  );
}

export { ProfileSettings };
