import { useTranslation } from "react-i18next";

import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

function AskUserName() {
  const { t } = useTranslation();

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={t("settings.profile.namePrompt")}
        inputType={FormInputType.Username}
        nextRoute={StartupRouteName.Gender}
      />
    </GradientWrapper>
  );
}

export { AskUserName };
