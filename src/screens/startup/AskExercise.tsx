import { View } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PrimaryText } from "@/components/texts";
import { PrimaryButton } from "@/components/buttons";
import { CustomSelectBox } from "@/components/input";
import { GradientWrapper } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { exerciseLevelSelectBoxItems } from "@/utils/constants/components/inputs";
import { startupStyles } from "@/utils/constants";

import { setExerciseLvl } from "@/store/userData";
import { StartupRouteName } from "@/enums/routes/StartupRouteName";

function AskExercise() {
  const dispatch = useDispatch();
  const [userExerciseLvl, setUserExerciseLvl] = useState(
    exerciseLevelSelectBoxItems[0]!.title
  );
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const saveExerciseLvl = () => {
    dispatch(setExerciseLvl(userExerciseLvl));
    navigation.navigate(StartupRouteName.CalcIntake);
  };

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={startupStyles.wrapper}>
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
