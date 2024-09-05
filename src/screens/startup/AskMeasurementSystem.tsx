import { useTranslation } from "react-i18next";

import { GradientWrapper } from "@/components/wrappers";
import { AskWrapper } from "@/components/startup/AskWrapper";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { FormInputType } from "@/enums/input/FormInputType";

import { useSelectBoxItems } from "@/hooks";

function AskMeasurementSystem() {
  const { t } = useTranslation();
  const { measurementSystemSelectBoxItems } = useSelectBoxItems();

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <AskWrapper
        question={t("settings.profile.measurementSystemPrompt")}
        inputType={FormInputType.MeasurementSystem}
        nextRoute={StartupRouteName.Weight}
        selectBoxItems={measurementSystemSelectBoxItems}
      />
    </GradientWrapper>
  );
}

export { AskMeasurementSystem };
