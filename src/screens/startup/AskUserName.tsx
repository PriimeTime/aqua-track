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
import { wsStyles } from "@/utils/constants/welcomescreen";

import { setUsername } from "@/store/userData";

import { StartupRouteName } from "@/enums/routes/StartupRouteName";

function AskUserName() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  const saveUserName = () => {
    dispatch(setUsername(userName));
    navigation.navigate(StartupRouteName.Gender);
  };

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={wsStyles.wrapper}>
        <PrimaryText fontSize={paragraphMediumFontSize}>
          {"What is your name?"}
        </PrimaryText>
        <CustomTextField
          value={userName}
          handleOnChangeText={(value) => setUserName(value)}
          fullWidth
        ></CustomTextField>
        <PrimaryButton onPress={saveUserName}>{"Continue"}</PrimaryButton>
      </View>
    </GradientWrapper>
  );
}

export { AskUserName };
