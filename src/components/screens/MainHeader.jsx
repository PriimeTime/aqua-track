import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { PrimaryHeader } from "../themes/text/PrimaryHeader";

function MainHeader() {
  const waterIntake = useSelector((state) => state.waterIntake.value);

  function getHeaderText() {
    if (waterIntake === 0) {
      return `You didn't drink anything yet. Time to hydrate yourself!`;
    } else {
      return `You drank ${waterIntake} ml of liquid today!`;
    }
  }

  return (
    <View style={styles.wrapper}>
      <PrimaryHeader size={waterIntake === 0 ? 2 : 3}>
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
