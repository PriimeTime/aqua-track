import { useTranslation } from "react-i18next";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

function AskUserName() {
  const { t } = useTranslation();

  return (
    /* Workaround for not being able to dismiss keyboard natively */
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <GradientWrapper style={{ flex: 1 }}>
        <AskWrapper
          question={t("settings.profile.namePrompt")}
          inputType={FormInputType.Username}
          nextRoute={StartupRouteName.Gender}
        />
      </GradientWrapper>
    </TouchableWithoutFeedback>
  );
}

export { AskUserName };
