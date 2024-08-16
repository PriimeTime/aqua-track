import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { exerciseLevelSelectBoxItems } from "@/utils/constants/components/inputs";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

function AskExercise() {
  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={"Do you do exercise?"}
        inputType={FormInputType.ExerciseLvl}
        nextRoute={StartupRouteName.CalcIntake}
        selectBoxItems={exerciseLevelSelectBoxItems}
      />
    </GradientWrapper>
  );
}

export { AskExercise };
