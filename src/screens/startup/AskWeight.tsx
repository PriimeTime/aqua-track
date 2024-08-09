import { View } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PrimaryText } from "@/components/texts";
import { PrimaryButton } from "@/components/buttons";
import { CustomTextField } from "@/components/input";
import { GradientWrapper } from "@/components/wrappers";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { numToString } from "@/utils/helpers";
import { startupStyles } from "@/utils/constants";

import { setWeight } from "@/store/userData";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";

function AskWeight() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const [userWeight, setUserWeight] = useState(0);

  const saveWeight = () => {
    dispatch(setWeight(userWeight));
    navigation.navigate(StartupRouteName.Exercise);
  };

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={startupStyles.wrapper}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {"How much do you weight?"}
        </PrimaryText>
        <CustomTextField
          fullWidth
          inputType={CustomTextFieldInputType.Number}
          maxLength={3}
          append="kg"
          value={numToString(userWeight)}
          handleOnChangeText={(value) => setUserWeight(Number(value))}
        ></CustomTextField>
        <PrimaryButton onPress={saveWeight}>{"Continue"}</PrimaryButton>
      </View>
    </GradientWrapper>
  );
}

export { AskWeight };
