import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "../../themes/button/PrimaryButton";
import { CardButton } from "../../themes/button/CardButton";

function TypeInputScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const drinkTypes = [
    { icon: "water-outline", label: "Water" },
    { icon: "cafe-outline", label: "Tea" },
    { icon: "water-outline", label: "Soda" },
    { icon: "cafe-outline", label: "Coffee" },
  ];

  return (
    <View style={[{ paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.header.text}>What did you drink?</Text>
      </View>
      <ScrollView
        style={styles.drinkTypeSelectionWrapper}
        contentContainerStyle={styles.drinkTypeContentContainer}
      >
        {drinkTypes.map((drink, index) => (
          <CardButton key={index} buttonIcon={drink.icon}>
            {drink.label}
          </CardButton>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          onPress={() => navigation.navigate("quantityInputScreen")}
        >
          Yep, that's what I drank
        </PrimaryButton>
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
    text: {
      fontSize: 35,
      fontWeight: 300,
    },
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
