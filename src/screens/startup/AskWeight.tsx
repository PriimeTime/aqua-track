import { useTranslation } from "react-i18next";

import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

function AskWeight() {
  const { t } = useTranslation();

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={t("settings.profile.weightPrompt")}
        inputType={FormInputType.Weight}
        nextRoute={StartupRouteName.Exercise}
      />
    </GradientWrapper>
  );
}

export { AskWeight };
