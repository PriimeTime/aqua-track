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
import { genderSelectBoxItems } from "@/utils/constants/components/inputs";
import { startupStyles } from "@/utils/constants";

import { setGender } from "@/store/userData";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";

function AskGender() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const [userGender, setUserGender] = useState(genderSelectBoxItems[0]!.title);

  const saveGender = () => {
    dispatch(setGender(userGender));
    navigation.navigate(StartupRouteName.Weight);
  };

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={startupStyles.wrapper}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {"What is your gender?"}
        </PrimaryText>
        <CustomSelectBox
          items={genderSelectBoxItems}
          handleOnSelect={(value) => setUserGender(value)}
          value={userGender}
        ></CustomSelectBox>
        <PrimaryButton onPress={saveGender}>{"Continue"}</PrimaryButton>
      </View>
    </GradientWrapper>
  );
}

export { AskGender };
