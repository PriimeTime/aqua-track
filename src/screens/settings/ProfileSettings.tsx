import { View } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, StackActions } from "@react-navigation/native";

import { ContentPage } from "@/components/wrappers";
import { CustomTextField, CustomSelectBox } from "@/components/input";
import { PrimaryButton } from "@/components/buttons";
import { InputContentWrapper } from "@/components/input";

import { setUserMetrics } from "@/store/userData";

import { UserDataState } from "@/types/store/UserDataState";

import { UserMetrics } from "@/models/UserMetrics";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";

import { numToString } from "@/utils/helpers";

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

function ProfileSettings() {
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );

  const [metricObject, setMetricObject] = useState(userMetrics);

  const handleOnChange = <T extends keyof UserMetrics>(
    value: UserMetrics[T],
    name: T
  ) => {
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
      <InputContentWrapper>
        <CustomTextField
          inputType={CustomTextFieldInputType.Number}
          maxLength={2}
          label="Age"
          value={numToString(metricObject.age)}
          handleOnChangeText={(value) => handleOnChange(Number(value), "age")}
        ></CustomTextField>
      </InputContentWrapper>
      <InputContentWrapper>
        <CustomSelectBox
          items={genderSelectBoxItems}
          label="Gender"
          handleOnSelect={(value) => handleOnChange(value, "gender")}
          value={metricObject.gender}
        ></CustomSelectBox>
      </InputContentWrapper>
      <InputContentWrapper>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <CustomTextField
            inputType={CustomTextFieldInputType.Number}
            maxLength={3}
            label="Height"
            append="cm"
            value={numToString(metricObject.height)}
            handleOnChangeText={(value) =>
              handleOnChange(Number(value), "height")
            }
          ></CustomTextField>
          <CustomTextField
            inputType={CustomTextFieldInputType.Number}
            maxLength={3}
            label="Weight"
            append="kg"
            value={numToString(metricObject.weight)}
            handleOnChangeText={(value) =>
              handleOnChange(Number(value), "weight")
            }
          ></CustomTextField>
        </View>
      </InputContentWrapper>
      <InputContentWrapper>
        <CustomSelectBox
          items={exerciseLevelSelectBoxItems}
          label="Exercise Level"
          handleOnSelect={(value) => handleOnChange(value, "exerciseLvl")}
          value={metricObject.exerciseLvl}
        ></CustomSelectBox>
      </InputContentWrapper>
      <PrimaryButton onPress={handleOnSave}>
        {"Save changes".toUpperCase()}
      </PrimaryButton>
    </ContentPage>
  );
}

export { ProfileSettings };
