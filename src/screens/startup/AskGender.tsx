import { useTranslation } from "react-i18next";

import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

import { useSelectBoxItems } from "@/hooks";

function AskGender() {
  const { t } = useTranslation();
  const { genderSelectBoxItems } = useSelectBoxItems();

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={t("settings.profile.genderPrompt")}
        inputType={FormInputType.Gender}
        nextRoute={StartupRouteName.Weight}
        selectBoxItems={genderSelectBoxItems}
      />
    </GradientWrapper>
  );
}

export { AskGender };
