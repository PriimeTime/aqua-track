import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { genderSelectBoxItems } from "@/utils/constants/components/inputs";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

function AskGender() {
  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={"What is your gender?"}
        inputType={FormInputType.Gender}
        nextRoute={StartupRouteName.Weight}
        selectBoxItems={genderSelectBoxItems}
      />
    </GradientWrapper>
  );
}

export { AskGender };
