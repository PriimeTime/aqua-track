import { View } from "react-native";
import { CountUp } from "use-count-up";

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
            {currentHrsUntilSober > 0 && "h "}
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
            {currentMinsUntilSober > 0 && "m"}
          </>
        )}
      </PrimaryText>
      <View>
        <PrimaryText fontSize={timeUntilSoberTextFontSize}>
          until sober
        </PrimaryText>
      </View>
    </View>
  );
}

export { TimeUntilSober };
