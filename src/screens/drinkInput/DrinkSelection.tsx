import { useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { PrimaryText } from "@/components/texts";
import { CardButton, BackButton } from "@/components/buttons";
import { GradientWrapper } from "@/components/wrappers";
import { CustomFlatList } from "@/components/lists";

import { drinkTypeList } from "@/utils/maps";
import { animatedScaleValue } from "@/utils/animations";
import { headerFontSize } from "@/utils/constants/components/typography";
import { screenWidth } from "@/utils/constants";

import { DrinkItem } from "@/models/DrinkItem";

import { DrinkRouteName } from "@/enums/routes/DrinkRouteName";

const numColumns = 2; // Number of columns for the flatlist
const spacing = 16; // Spacing for the flatlist items in pixels

const itemWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

function DrinkSelection() {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const scaleValue = useRef(animatedScaleValue(1)).current;

  const handleButtonPress = (drink: DrinkItem) => {
    navigation.navigate(DrinkRouteName.DrinkAmount, { drinkType: drink });
  };

  return (
    <GradientWrapper style={styles.wrapper}>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText fontSize={headerFontSize}>
            {t("drinks.drinkTypePrompt")}
          </PrimaryText>
        </Animated.View>
      </View>
      <CustomFlatList
        data={drinkTypeList}
        rowsOfListItemsOnScreen={5}
        wrapperStyles={styles.flatListWrapper}
        listItemStyles={{ width: itemWidth, marginVertical: spacing / 2 }}
        verticalSpacingOffset={spacing}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <CardButton
            style={styles.cardButton}
            imageSrc={item.imageSrc}
            onPress={() => handleButtonPress(item)}
          >
            {item.label}
          </CardButton>
        )}
      ></CustomFlatList>
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
    height: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  flatListWrapper: {
    height: "75%",
    bottom: "2.5%",
    width: "100%",
    position: "absolute",
  },
  flatListContent: {
    paddingHorizontal: spacing / 2,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: spacing / 2,
  },
  cardButton: {
    width: "100%",
    height: "100%",
  },
});
