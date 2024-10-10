import { useTranslation } from "react-i18next";

import { Gender } from "@/enums/settings/Gender";

import { SelectBoxItem } from "@/models/SelectBoxItem";

import { ExerciseLevel } from "@/enums/settings/ExerciseLevel";
import { MeasurementSystem } from "@/enums/settings/MeasurementSystem";

const useSelectBoxItems = () => {
  const { t } = useTranslation();

  const genderSelectBoxItems: SelectBoxItem[] = [
    { id: Gender.Male, label: t("settings.profile.male") },
    { id: Gender.Female, label: t("settings.profile.female") },
    { id: Gender.Other, label: t("settings.profile.other") },
  ];

  const measurementSystemSelectBoxItems: SelectBoxItem[] = [
    {
      id: MeasurementSystem.Metric,
      label: t("settings.profile.measurementSystemMetric"),
    },
    {
      id: MeasurementSystem.Imperial,
      label: t("settings.profile.measurementSystemImperial"),
    },
  ];

  const exerciseLevelSelectBoxItems: SelectBoxItem[] = [
    { id: ExerciseLevel.No, label: t("settings.profile.exerciseLow") },
    { id: ExerciseLevel.Sometimes, label: t("settings.profile.exerciseMid") },
    { id: ExerciseLevel.Often, label: t("settings.profile.exerciseHigh") },
  ];

  return {
    genderSelectBoxItems,
    measurementSystemSelectBoxItems,
    exerciseLevelSelectBoxItems,
  };
};

export { useSelectBoxItems };
