import { SelectBoxItem } from "@/models/SelectBoxItem";
import { useTranslation } from "react-i18next";

const useSelectBoxItems = () => {
  const { t } = useTranslation();

  const genderSelectBoxItems: SelectBoxItem[] = [
    { id: 1, title: t("settings.profile.male") },
    { id: 2, title: t("settings.profile.female") },
    { id: 3, title: t("settings.profile.other") },
  ];

  const exerciseLevelSelectBoxItems: SelectBoxItem[] = [
    { id: 1, title: t("settings.profile.exerciseLow") },
    { id: 2, title: t("settings.profile.exerciseMid") },
    { id: 3, title: t("settings.profile.exerciseHigh") },
  ];

  return { genderSelectBoxItems, exerciseLevelSelectBoxItems };
};

export { useSelectBoxItems };
