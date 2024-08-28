import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

import { ContentPage } from "@/components/wrappers";
import { CustomTextField, CustomSelectBox } from "@/components/input";
import { PrimaryButton } from "@/components/buttons";
import { InputContentWrapper } from "@/components/input";

import { setDailyHydrationGoal, setUserMetrics } from "@/store/userData";

import { type UserDataState } from "@/types/store/UserDataState";

import { UserMetrics } from "@/models/UserMetrics";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";

import { calculateDailyHydrationGoalInMl, numToString } from "@/utils/helpers";
import {
  exerciseLevelSelectBoxItems,
  genderSelectBoxItems,
} from "@/utils/constants/components/inputs";
import { color, initialUserMetrics } from "@/utils/constants";

import { useModal } from "@/hooks";

function ProfileSettings() {
  const { t } = useTranslation();
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const [openModal] = useModal();

  const [metricObject, setMetricObject] = useState(userMetrics);

  const recalculateDailyWaterIntakeInMl = () => {
    let dailyHydrationGoalInMl = initialUserMetrics.dailyHydrationGoal;

    if (metricObject.weight && metricObject.exerciseLvl) {
      dailyHydrationGoalInMl = calculateDailyHydrationGoalInMl(
        metricObject.weight,
        metricObject.exerciseLvl
      );
    }

    dispatch(setDailyHydrationGoal(dailyHydrationGoalInMl));
  };

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
    /** Validate weight input */
    if (Number(metricObject.weight) < 10 || Number(metricObject.weight) > 800) {
      openModal({
        modalText: "Please enter a meaningful weight!",
      });
      return;
    }

    dispatch(setUserMetrics(metricObject));
    recalculateDailyWaterIntakeInMl();
    navigation.dispatch(popAction);
  };

  return (
    <ContentPage title="Metrics & Body Measurements">
      <Text>asdf</Text>
      <Text>{t("home.title")}</Text>
      {/* <InputContentWrapper>
        <CustomTextField
          inputType={CustomTextFieldInputType.Number}
          maxLength={2}
          label="Age"
          value={numToString(metricObject.age)}
          handleOnChangeText={(value) => handleOnChange(Number(value), "age")}
        ></CustomTextField>
      </InputContentWrapper> */}
      <InputContentWrapper>
        <CustomSelectBox
          items={genderSelectBoxItems}
          label="Gender"
          handleOnSelect={(value) => handleOnChange(value, "gender")}
          value={metricObject.gender}
        ></CustomSelectBox>
      </InputContentWrapper>
      <InputContentWrapper>
        {/* <View style={{ flex: 1, flexDirection: "row" }}> */}
        {/* <CustomTextField
            inputType={CustomTextFieldInputType.Number}
            maxLength={3}
            label="Height"
            append="cm"
            value={numToString(metricObject.height)}
            handleOnChangeText={(value) =>
              handleOnChange(Number(value), "height")
            }
          ></CustomTextField> */}
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
        {/* </View> */}
      </InputContentWrapper>
      <InputContentWrapper>
        <CustomSelectBox
          items={exerciseLevelSelectBoxItems}
          label={"Do you do exercise?"}
          handleOnSelect={(value) => handleOnChange(value, "exerciseLvl")}
          value={metricObject.exerciseLvl}
        ></CustomSelectBox>
      </InputContentWrapper>
      <InputContentWrapper>
        <CustomTextField
          fullWidth
          readOnly
          label={"Calculated daily Water intake"}
          value={`${userMetrics.dailyHydrationGoal} ml`}
          inputColor={color.BLUE}
        ></CustomTextField>
      </InputContentWrapper>
      <PrimaryButton onPress={handleOnSave}>
        {"Save changes".toUpperCase()}
      </PrimaryButton>
    </ContentPage>
  );
}

export { ProfileSettings };
