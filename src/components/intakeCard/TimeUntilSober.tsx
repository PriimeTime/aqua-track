import { View } from "react-native";
import { CountUp } from "use-count-up";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts/PrimaryText";

import {
  timeUntilSoberFontSize,
  timeUntilSoberTextFontSize,
} from "@/utils/constants/components/typography";

interface TimeUntilSoberProps {
  currentHrsUntilSober: number;
  prevHrsUntilSober: number;
  currentMinsUntilSober: number;
  prevMinsUntilSober: number;
}

function TimeUntilSober({
  currentHrsUntilSober,
  prevHrsUntilSober,
  currentMinsUntilSober,
  prevMinsUntilSober,
}: TimeUntilSoberProps) {
  const { t } = useTranslation();

  return (
    <View>
      <PrimaryText fontSize={timeUntilSoberFontSize}>
        {currentHrsUntilSober > 0 && (
          <>
            <CountUp
              key={`${currentHrsUntilSober}h`}
              isCounting
              start={prevHrsUntilSober}
              end={currentHrsUntilSober}
              duration={2} // Duration in seconds
              easing={"easeOutCubic"}
            />
            {currentHrsUntilSober > 0 && `${t("unit.hoursAbbrv")} `}
          </>
        )}
        {currentMinsUntilSober > 0 && (
          <>
            <CountUp
              key={`${currentMinsUntilSober}m`}
              isCounting
              start={prevMinsUntilSober}
              end={currentMinsUntilSober}
              duration={2} // Duration in seconds
              easing={"easeOutCubic"}
            />
            {currentMinsUntilSober > 0 && `${t("unit.minutesAbbrv")} `}
          </>
        )}
      </PrimaryText>
      <View>
        <PrimaryText fontSize={timeUntilSoberTextFontSize}>
          {t("drinks.untilSober")}
        </PrimaryText>
      </View>
    </View>
  );
}

export { TimeUntilSober };
