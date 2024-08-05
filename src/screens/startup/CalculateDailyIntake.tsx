import { View } from "react-native";

import { PrimaryText } from "@/components/texts";
import { GradientWrapper } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { startupStyles } from "@/utils/constants";

import { useEffect } from "react";

interface CalculateDailyIntakeProps {
  onCompleteStartup: () => void;
}

function CalculateDailyIntake({
  onCompleteStartup,
}: CalculateDailyIntakeProps) {
  useEffect(() => {
    setTimeout(() => {
      // TODO: play some animation
      onCompleteStartup();
    }, 7000);
  }, []);

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={startupStyles.wrapper}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {"Calculating daily intake..."}
        </PrimaryText>
      </View>
    </GradientWrapper>
  );
}

export { CalculateDailyIntake };
