import { ContentPage } from "../ContentPage";
import { CustomTextField } from "../../components/input/CustomTextField";
import { CustomSelectBox } from "../../components/input/CustomSelectBox";
import { View } from "react-native";
import { useState } from "react";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setUserMetrics } from "../../store/userData";
import { useNavigation, StackActions } from "@react-navigation/native";

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
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userMetrics = useSelector((state) => state.userData.userMetrics);

  const [metricObject, setMetricObject] = useState(userMetrics);

  const handleOnChange = (value, name) => {
    setMetricObject((prevValue) => {
      const retVal = { ...prevValue };
      retVal[name] = value;
      return retVal;
    });
  };

  const handleOnSave = () => {
    dispatch(setUserMetrics(metricObject));
    navigation.dispatch(popAction);
  };

  return (
    <ContentPage title="Metrics & Body Measurements">
      <ContentWrapper>
        <CustomTextField
          keyboardType="numeric"
          maxLength={2}
          label="Age"
          value={metricObject.age}
          handleOnChangeText={(value) => handleOnChange(value, "age")}
        ></CustomTextField>
      </ContentWrapper>
      <ContentWrapper>
        <CustomSelectBox
          items={genderSelectBoxItems}
          label="Gender"
          handleOnSelect={(value) => handleOnChange(value, "gender")}
          value={metricObject.gender}
        ></CustomSelectBox>
      </ContentWrapper>
      <ContentWrapper>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <CustomTextField
            keyboardType="numeric"
            maxLength={3}
            label="Height"
            append="cm"
            value={metricObject.height}
            handleOnChangeText={(value) => handleOnChange(value, "height")}
          ></CustomTextField>
          <CustomTextField
            keyboardType="numeric"
            maxLength={3}
            label="Weight"
            append="kg"
            value={metricObject.weight}
            handleOnChangeText={(value) => handleOnChange(value, "weight")}
          ></CustomTextField>
        </View>
      </ContentWrapper>
      <ContentWrapper>
        <CustomSelectBox
          items={exerciseLevelSelectBoxItems}
          label="Exercise Level"
          handleOnSelect={(value) => handleOnChange(value, "exerciseLvl")}
          value={metricObject.exerciseLvl}
        ></CustomSelectBox>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PrimaryButton onPress={handleOnSave}>
            {"Save changes".toUpperCase()}
          </PrimaryButton>
        </View>
      </ContentWrapper>
    </ContentPage>
  );
}

export { ProfileSettings };
