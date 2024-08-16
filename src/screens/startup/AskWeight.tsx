import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

function AskWeight() {
  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={"How much do you weigh?"}
        inputType={FormInputType.Weight}
        nextRoute={StartupRouteName.Exercise}
      />
    </GradientWrapper>
  );
}

export { AskWeight };
