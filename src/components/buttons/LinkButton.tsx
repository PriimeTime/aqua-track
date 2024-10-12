import React from "react";
import { TouchableOpacity } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MainRouteName } from "@/enums/routes/MainRouteName";

import { PrimaryText } from "@/components/texts";

import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { color } from "@/utils/constants";

type InAppBrowserNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  MainRouteName.InAppBrowser
>;

interface LinkButtonProps {
  url: string;
  text?: string;
}

function LinkButton({ url, text }: LinkButtonProps) {
  const navigation = useNavigation<InAppBrowserNavigationProp>();

  const openInAppBrowser = () => {
    navigation.navigate(MainRouteName.InAppBrowser, {
      url,
    });
  };

  return (
    <TouchableOpacity onPress={openInAppBrowser}>
      <PrimaryText color={color.BLUE} fontSize={paragraphMediumFontSize}>
        {text || url}
      </PrimaryText>
    </TouchableOpacity>
  );
}

export default LinkButton;
