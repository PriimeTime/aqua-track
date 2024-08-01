import React, { useState, useRef } from "react";
import { View, StyleSheet, Animated, FlatList } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PrimaryText } from "@/components/texts";
import { CardButton, BackButton } from "@/components/buttons";
import { GradientWrapper } from "@/components/wrappers";

import { drinkTypeList } from "@/utils/maps";
import { animatedScaleValue } from "@/utils/animations";
import { numToString } from "@/utils/helpers";
import { headerFontSize } from "@/utils/constants/components/typography";
import { screenWidth } from "@/utils/constants";

import { DrinkItem } from "@/models/DrinkItem";

import { DrinkRouteName } from "@/enums/routes/DrinkRouteName";

const numColumns = 2;
const rowsOfListItemsOnScreen = 5;
const spacing = 16;

const itemWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

function DrinkSelection() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [flatListHeight, setFlatListHeight] = useState(0);

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
            What did you drink?
          </PrimaryText>
        </Animated.View>
      </View>
      <View
        style={styles.flatListWrapper}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setFlatListHeight(height);
        }}
      >
        <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          numColumns={numColumns}
          columnWrapperStyle={styles.columnWrapper}
          data={drinkTypeList}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardContainer,
                {
                  height:
                    flatListHeight * (1 / rowsOfListItemsOnScreen) - spacing,
                  width: itemWidth,
                },
              ]}
            >
              <CardButton
                style={styles.cardButton}
                imageSrc={item.imageSrc}
                onPress={() => handleButtonPress(item)}
              >
                {item.label}
              </CardButton>
            </View>
          )}
          keyExtractor={(item) => numToString(item.typeID)}
        />
      </View>
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
  cardContainer: {
    margin: spacing / 2,
  },
  cardButton: {
    width: "100%",
    height: "100%",
  },
});
