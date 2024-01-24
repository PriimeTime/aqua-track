import { StyleSheet, View } from "react-native";

import { PrimaryHeader } from "../themes/text/PrimaryHeader";

function MainHeader({ amountDrank }) {
  function getHeaderText() {
    if (amountDrank === 0) {
      return `You didn't drink anything yet. Time to hydrate yourself!`;
    } else {
      return `You drank ${amountDrank} ml of liquid today!`;
    }
  }

  return (
    <View style={styles.wrapper}>
      <PrimaryHeader size={amountDrank === 0 ? 2 : 3}>
        {getHeaderText()}
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
