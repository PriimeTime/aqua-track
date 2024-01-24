import { StyleSheet, View } from "react-native";

import { PrimaryHeader } from "./themes/text/PrimaryHeader";

function MainHeader({ amountDrank }) {
  return (
    <View style={styles.wrapper}>
      <PrimaryHeader size={1}>
        You drank {amountDrank} ml of liquid today!
      </PrimaryHeader>
    </View>
  );
}

export { MainHeader };

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
