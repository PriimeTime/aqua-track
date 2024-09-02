import { useTranslation } from "react-i18next";

import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

import { useSelectBoxItems } from "@/hooks";

function AskExercise() {
  const { t } = useTranslation();
  const { exerciseLevelSelectBoxItems } = useSelectBoxItems();

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={t("settings.profile.exercisePrompt")}
        inputType={FormInputType.ExerciseLvl}
        nextRoute={StartupRouteName.CalcIntake}
        selectBoxItems={exerciseLevelSelectBoxItems}
      />
    </GradientWrapper>
  );
}

export { AskExercise };
