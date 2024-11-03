import { View, Image, StyleSheet, Animated, Pressable } from "react-native";
import { useRef } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScaledSheet } from "react-native-size-matters";

import { PrimaryText } from "@/components/texts";

import { SettingsRouteName } from "@/enums/routes/SettingsRouteName";

import { settingsImageMap } from "@/utils/maps";
import { color, cardBorderWidth } from "@/utils/constants";
import { animateButtonPress, animatedScaleValue } from "@/utils/animations";
import { paragraphLargeFontSize } from "@/utils/constants/components/typography";
import { cardBorderRadius } from "@/utils/constants/components/buttons";

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
          <View style={scaledStyles.itemTitleWrapper}>
            <View style={{ width: "95%", left: 0 }}>
              <PrimaryText numberOfLines={1} fontSize={paragraphLargeFontSize}>
                {title}
              </PrimaryText>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export { SettingsItem };

const scaledStyles = ScaledSheet.create({
  itemTitleWrapper: {
    justifyContent: "center",
    width: "80%",
    height: "100%",
    padding: "8@ms",
  },
});

const styles = StyleSheet.create({
  wrapper: {
    height: "95%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: color.WHITE,
    borderColor: color.LIGHTBLUE,
    borderRadius: cardBorderRadius,
    borderWidth: cardBorderWidth,
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
});
