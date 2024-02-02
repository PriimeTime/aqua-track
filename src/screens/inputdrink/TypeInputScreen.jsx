import { View, StyleSheet, ScrollView, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { PrimaryText } from "../../components/texts/PrimaryText";
import { CardButton } from "../../components/buttons/CardButton";

import { setType, resetType } from "../../store/store";
import { drinkTypeList } from "../../utils/maps";
import { color } from "../../utils/themes";

function TypeInputScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const drinkType = useSelector((state) => state.drinkType.value);

  const scaleValue = useRef(new Animated.Value(1)).current;

  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCardPress = (drink) => {
    /**
     * Toggle functionality
     */
    if (drinkType.id === drink.id) {
      dispatch(resetType());
    } else {
      dispatch(setType(drink));
    }
  };

  const handleButtonPress = () => {
    if (drinkType.id > -1) {
      navigation.navigate("quantityInputScreen");
    } else {
      triggerAnimation();
    }
  };

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText size={1}>What did you drink?</PrimaryText>
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
            buttonIcon={drink.icon}
            selected={drinkType.id === drink.id}
            onPress={() => handleCardPress(drink)}
          >
            {drink.label}
          </CardButton>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton onPress={handleButtonPress}>Continue</PrimaryButton>
      </View>
    </View>
  );
}

export { TypeInputScreen };

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
  },
  header: {
    width: "90%",
    left: "5%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  drinkTypeSelectionWrapper: {
    width: "90%",
    left: "5%",
    height: "50%",
  },
  drinkTypeContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 500,
  },
  footer: {
    width: "90%",
    left: "5%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
