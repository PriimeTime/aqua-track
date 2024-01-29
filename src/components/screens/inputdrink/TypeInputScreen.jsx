import { View, StyleSheet, ScrollView, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import { PrimaryButton } from "../../themes/button/PrimaryButton";
import { PrimaryText } from "../../themes/text/PrimaryText";
import { CardButton } from "../../themes/button/CardButton";

import { setType, resetType } from "../../../store/store";
import { drinkTypeList } from "../../../utils/maps";

function TypeInputScreen({ navigation }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const drinkType = useSelector((state) => state.drinkType.value);

  const scaleValue = useState(new Animated.Value(1))[0];

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
    <View style={[{ paddingTop: insets.top }]}>
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
  header: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  drinkTypeSelectionWrapper: {
    width: "100%",
    height: "50%",
  },
  drinkTypeContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 500,
  },
  footer: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
