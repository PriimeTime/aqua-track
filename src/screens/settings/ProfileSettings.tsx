import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, StackActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { ContentPage } from "@/components/wrappers";
import { CustomTextField, CustomSelectBox } from "@/components/input";
import { PrimaryButton } from "@/components/buttons";
import { InputContentWrapper } from "@/components/input";

import { setDailyHydrationGoal, setUserMetrics } from "@/store/userData";

import { type UserDataState } from "@/types/store/UserDataState";

import { UserMetrics } from "@/models/UserMetrics";

import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";
import { Gender } from "@/enums/settings/Gender";
import { ExerciseLevel } from "@/enums/settings/ExerciseLevel";

import { calculateDailyHydrationGoalInMl, numToString } from "@/utils/helpers";

import { color, initialUserMetrics } from "@/utils/constants";

import { useModal, useSelectBoxItems } from "@/hooks";

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

  const { genderSelectBoxItems, exerciseLevelSelectBoxItems } =
    useSelectBoxItems();

  useEffect(() => {
    /* Recalculate daily water intake on render
      to make sure it is always up to date
      (Could be out of sync when i.e. changing language) */
    recalculateDailyWaterIntakeInMl();
  }, []);

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
        modalText: t("validation.invalidWeight"),
      });
      return;
    }

    dispatch(setUserMetrics(metricObject));
    recalculateDailyWaterIntakeInMl();
    navigation.dispatch(popAction);
  };

  return (
    <ContentPage title={t("settings.profile.header")}>
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
          label={t("settings.profile.gender")}
          handleOnSelect={(value) => handleOnChange(value as Gender, "gender")}
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
          label={t("settings.profile.weight")}
          append={t("unit.kilogramAbbrv")}
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
          label={t("settings.profile.exercisePrompt")}
          handleOnSelect={(value) =>
            handleOnChange(value as ExerciseLevel, "exerciseLvl")
          }
          value={metricObject.exerciseLvl}
        ></CustomSelectBox>
      </InputContentWrapper>
      <InputContentWrapper>
        <CustomTextField
          fullWidth
          readOnly
          label={t("settings.profile.dailyIntake")}
          value={`${userMetrics.dailyHydrationGoal} ${t(
            "unit.millilitersAbbrv"
          )}`}
          inputColor={color.BLUE}
        ></CustomTextField>
      </InputContentWrapper>
      <PrimaryButton onPress={handleOnSave}>
        {t("settings.profile.save").toUpperCase()}
      </PrimaryButton>
    </ContentPage>
  );
}

export { ProfileSettings };
