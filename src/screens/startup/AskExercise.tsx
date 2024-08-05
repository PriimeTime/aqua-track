import { View } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { PrimaryText } from "@/components/texts";
import { PrimaryButton } from "@/components/buttons";
import { CustomSelectBox } from "@/components/input";
import { GradientWrapper } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { exerciseLevelSelectBoxItems } from "@/utils/constants/components/inputs";
import { wsStyles } from "@/utils/constants/welcomescreen";

import { setExerciseLvl } from "@/store/userData";

interface AskExerciseProps {
  onCompleteStartup: () => void;
}

function AskExercise({ onCompleteStartup }: AskExerciseProps) {
  const dispatch = useDispatch();
  const [userExerciseLvl, setUserExerciseLvl] = useState(
    exerciseLevelSelectBoxItems[0]!.title
  );

  const saveExerciseLvl = () => {
    dispatch(setExerciseLvl(userExerciseLvl));
    onCompleteStartup();
  };

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={wsStyles.wrapper}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {"Do you do exercise?"}
        </PrimaryText>

        <CustomSelectBox
          items={exerciseLevelSelectBoxItems}
          handleOnSelect={(value) => setUserExerciseLvl(value)}
          value={userExerciseLvl}
        ></CustomSelectBox>
        <PrimaryButton onPress={saveExerciseLvl}>{"Continue"}</PrimaryButton>
      </View>
    </GradientWrapper>
  );
}

export { AskExercise };
