import { View, Image, StyleSheet, Animated, Pressable } from "react-native";
import { useRef } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PrimaryText } from "@/components/texts";

import { SettingsRouteName } from "@/enums/routes/SettingsRouteName";

import { settingsImageMap } from "@/utils/maps";
import {
  color,
  listItemHeight,
  cardBorderWidth,
  SCREEN_SIZE,
} from "@/utils/constants";
import { animateButtonPress, animatedScaleValue } from "@/utils/animations";

const titleSize = {
  SMALL: 1,
  MEDIUM: 4,
  LARGE: 7,
};

const itemBorderRadius = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 25,
};

interface SettingsItemProps {
  title: string;
  imageSrc: string;
  routeName: SettingsRouteName;
}

function SettingsItem({ title, imageSrc, routeName }: SettingsItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const scaleValue = useRef(animatedScaleValue(1)).current;

  const handleOnPress = () => {
    navigation.navigate(routeName);
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, animatedScaleValue(0.9));
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, animatedScaleValue(1));
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
      <Pressable
        onPress={handleOnPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <View style={styles.wrapper}>
          <View style={styles.itemIconWrapper}>
            <Image
              style={styles.itemIcon}
              source={settingsImageMap[imageSrc]}
            ></Image>
          </View>
          <View style={styles.itemTitleWrapper}>
            <View style={{ width: "95%", left: 0 }}>
              <PrimaryText size={titleSize[SCREEN_SIZE]}>{title}</PrimaryText>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export { SettingsItem };

const styles = StyleSheet.create({
  wrapper: {
    height: listItemHeight[SCREEN_SIZE] * 0.75,
    width: "100%",
    flexDirection: "row",
    backgroundColor: color.WHITE,
    borderColor: color.LIGHTBLUE,
    borderRadius: itemBorderRadius[SCREEN_SIZE],
    borderWidth: cardBorderWidth[SCREEN_SIZE],
  },
  itemIconWrapper: {
    width: "20%",
    height: "100%",
  },
  itemIcon: {
    width: "40%",
    height: "40%",
    left: "30%",
    top: "30%",
    objectFit: "contain",
  },
  itemTitleWrapper: {
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
});
