import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "../../themes/button/PrimaryButton";
import { PrimaryText } from "../../themes/text/PrimaryText";
import { CardButton } from "../../themes/button/CardButton";

import { setType, resetType } from "../../../store/store.js";
import { drinkTypeList } from "../../../utils/maps";

function TypeInputScreen({ navigation }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const drinkType = useSelector((state) => state.drinkType.value);

  const handleCardPress = (id) => {
    /**
     * Toggle functionality
     */
    if (drinkType === id) {
      dispatch(resetType());
    } else {
      dispatch(setType(id));
    }
  };

  const handleButtonPress = () => {
    if (drinkType > -1) {
      navigation.navigate("quantityInputScreen");
    } else {
      // TODO: animate "what did you drink" text (jump a bit or sth)
    }
  };

  return (
    <View style={[{ paddingTop: insets.top }]}>
      <View style={styles.header}>
        <PrimaryText size={1}>What did you drink?</PrimaryText>
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
            selected={drinkType === drink.id}
            onPress={() => handleCardPress(drink.id)}
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
    left: "5%",
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
