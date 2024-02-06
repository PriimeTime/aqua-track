import { View, StyleSheet, ScrollView, Animated } from "react-native";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { PrimaryText } from "../../components/texts/PrimaryText";
import { CardButton } from "../../components/buttons/CardButton";

import { setType } from "../../store/store";
import { drinkTypeList } from "../../utils/maps";
import { color } from "../../utils/themes";
import { BackButton } from "../../components/buttons/BackButton";

function TypeInputScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleButtonPress = (drink) => {
    dispatch(setType(drink));
    navigation.navigate("quantityInputScreen");
  };

  return (
    <LinearGradient
      colors={[
        color.APP_PRIMARY_BACKGROUND_FIRST_GRADIENT,
        color.APP_PRIMARY_BACKGROUND_SECOND_GRADIENT,
      ]}
      style={[styles.wrapper, { paddingTop: insets.top }]}
    >
      <View style={styles.backButton}>
        <BackButton></BackButton>
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText size={3}>What did you drink?</PrimaryText>
        </Animated.View>
      </View>
      <ScrollView
        style={styles.drinkTypeSelectionWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.drinkTypeContentContainer}
      >
        {/* Using index as key since the
            card button list will not
            be altered at any point
            at runtime */}
        {drinkTypeList.map((drink, index) => (
          <CardButton
            key={index}
            imageSrc={drink.imageSrc}
            onPress={() => handleButtonPress(drink)}
          >
            {drink.label}
          </CardButton>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

export { TypeInputScreen };

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
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
