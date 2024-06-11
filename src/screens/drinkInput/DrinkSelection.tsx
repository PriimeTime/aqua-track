import { View, StyleSheet, Animated, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PrimaryText } from "@/components/texts/PrimaryText";
import { CardButton } from "@/components/buttons/CardButton";

import { drinkTypeList } from "@/utils/maps";
import { dimensions, SCREEN_SIZE } from "@/utils/constants";
import { BackButton } from "@/components/buttons/BackButton";
import { GradientWrapper } from "@/components/wrappers/GradientWrapper";
import { DrinkItem } from "@/models/DrinkItem";
import { animatedScaleValue } from "@/utils/animations/animatedScaleValue";
import { DrinkRouteName } from "@/enums/routes/DrinkRouteName";
import { numToString } from "@/utils/helpers";

const cardButtonHeight =
  SCREEN_SIZE === "LARGE"
    ? dimensions.CARD_BUTTON_HEIGHT_TABLET
    : dimensions.CARD_BUTTON_HEIGHT_PHONE;

const headerSize = {
  SMALL: 5,
  MEDIUM: 6,
  LARGE: 9,
};

function DrinkSelection() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const insets = useSafeAreaInsets();

  const scaleValue = useRef(animatedScaleValue(1)).current;

  const handleButtonPress = (drink: DrinkItem) => {
    navigation.navigate(DrinkRouteName.DrinkAmount, { drinkType: drink });
  };

  return (
    <GradientWrapper style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.backButton}>
        <BackButton></BackButton>
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText size={headerSize[SCREEN_SIZE]}>
            What did you drink?
          </PrimaryText>
        </Animated.View>
      </View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.drinkTypeSelectionWrapper}
        data={drinkTypeList}
        renderItem={({ item }) => (
          <CardButton
            style={{
              width: "46%",
              margin: "2%",
              height: cardButtonHeight,
            }}
            imageSrc={item.imageSrc}
            onPress={() => handleButtonPress(item)}
          >
            {item.label}
          </CardButton>
        )}
        keyExtractor={(item) => numToString(item.typeID)}
        getItemLayout={(_, index) => ({
          length: cardButtonHeight,
          offset: cardButtonHeight * index,
          index,
        })}
      ></FlatList>
    </GradientWrapper>
  );
}

export { DrinkSelection };

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  drinkTypeSelectionWrapper: {
    width: "90%",
    left: "5%",
  },
  drinkTypeContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
