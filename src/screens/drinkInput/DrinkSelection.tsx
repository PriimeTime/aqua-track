import { View, StyleSheet, Animated, FlatList } from "react-native";
import { useRef } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PrimaryText } from "@/components/texts";
import { CardButton, BackButton } from "@/components/buttons";
import { GradientWrapper } from "@/components/wrappers";

import { drinkTypeList } from "@/utils/maps";
import { dimensions, SCREEN_SIZE } from "@/utils/constants";
import { animatedScaleValue } from "@/utils/animations";
import { numToString } from "@/utils/helpers";

import { DrinkItem } from "@/models/DrinkItem";

import { DrinkRouteName } from "@/enums/routes/DrinkRouteName";

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

  const scaleValue = useRef(animatedScaleValue(1)).current;

  const handleButtonPress = (drink: DrinkItem) => {
    navigation.navigate(DrinkRouteName.DrinkAmount, { drinkType: drink });
  };

  return (
    <GradientWrapper style={styles.wrapper}>
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
    flex: 1,
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
